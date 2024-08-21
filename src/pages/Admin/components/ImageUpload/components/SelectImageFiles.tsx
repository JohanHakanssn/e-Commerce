import styles from "../image-upload.module.css";
import { ProductImages } from "types/productTypes";
import { useState } from "react";

interface SelectImageFilesProps {
	images: ProductImages;
	setImages: React.Dispatch<React.SetStateAction<ProductImages>>;
	fileLimit: boolean;
	setFileLimit: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_UPLOAD_COUNT = 5 as const;
const allowedTypes = ["image/jpeg", "image/png"] as const;

function SelectImageFiles({ images, setImages, fileLimit, setFileLimit }: SelectImageFilesProps) {
	const [errors, setErrors] = useState<string | null>(null);
	const isFileInArray = (array: (string | File)[], fileName: string): boolean => {
		return array.some(item => {
			if (item instanceof File) {
				return item.name === fileName;
			}
			return false;
		})
	}
	const handleNewFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors(null);
		const newMax = images.length > 0 ? (MAX_UPLOAD_COUNT - images.length) : MAX_UPLOAD_COUNT;
		// Verifierar att det finns valda filer
		const files = event.target.files;
		if (!files) {
			return;
		}
		// Kontrollerar att inte för många filer valts
		if (files.length > newMax) {
			setErrors("Maximum number of files exceeded!");
			return;
		}
		const selectedFiles: ProductImages = [];
		let limitExceeded: boolean = false;
		// Skapar en ny array med de senast valda filerna
		const filesArray = Array.prototype.slice.call(event.target.files);
		filesArray.some((file) => {
			// Kontrollerar att filerna är jpg/png.
			if (!allowedTypes.includes(file.type)) {
				setErrors("Allowed file types are, .jpg and .png");
				return;
			}
			// Om vald fil inte redan finns, pusha till arrayen
			if (!isFileInArray(images, file.name)) {
				selectedFiles.push(file);
			} else {
				setErrors("File already exists");
			}

			// Om max antal valda filer, ändra state fileLimit
			if (selectedFiles.length === newMax) {
				setFileLimit(true);
			}
			// Om fler än max antal, ändra state fileLimit till false, limitExceeded till true
			if (selectedFiles.length > newMax) {

				setFileLimit(false);
				limitExceeded = true;
				setErrors(`Additional number of files allowed:  ${newMax - selectedFiles.length}`);
				return true;
			}
		});
		if (!limitExceeded) {
			// Om inte maxgräns överträds, uppdatera state med den skapade arrayen
			setImages(() => [...images, ...selectedFiles]);

		}
	};
	
	return (
		<>
			<input
				type="file"
				id="fileUpload"
				name="fileUpload"
				multiple
				accept=".jpg, .jpeg, .png"
				className={styles.fileInput}
				onChange={handleNewFiles}
				disabled={fileLimit || images.length > 4}
			/>
			<label htmlFor="fileUpload" className={styles.label}>
				<a className={styles.uploadLink}>Upload images</a>
			</label>
			<p className={styles.imageErrors}>{errors ? errors : null}</p>
		</>
	);
}

export default SelectImageFiles;
