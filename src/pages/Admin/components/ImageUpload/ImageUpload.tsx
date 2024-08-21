import styles from "./image-upload.module.css";
import { ProductImages } from "types/productTypes";
import ImageThumbnail from "./components/ImageThumbnail";
import SelectImageFiles from "./components/SelectImageFiles";
import FilePreview from "./components/FilePreview";


interface ImageUploadProps {
	fileLimit: boolean;
	setFileLimit: React.Dispatch<React.SetStateAction<boolean>>;
	images: ProductImages;
	setImages: React.Dispatch<React.SetStateAction<ProductImages>>;
	imagesToDelete: string[];
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
}


// Bestämmer max antal bilder som kan laddas upp
const MAX_UPLOAD_COUNT = 5 as const;

function ImageUpload2({ images, setImages, imagesToDelete, setImagesToDelete, fileLimit, setFileLimit }: ImageUploadProps) {
	// Tar bort redan sparade bilder
	const deleteImage = (index: number) => {
		// Väljer aktuell bild från listan med bilder
		const imageUrl = images[index];
		// Kontrollerar att valt index inte är en fil, utan en sträng
		if (imageUrl instanceof File) {
			return;
		}
		setFileLimit(false);
		// Uppdaterar listan med bilder med den valda bilden borttagen
		setImages(images.filter((_, i) => i !== index));
		// Lägger till den valda bilden till listan med bilder som ska tas bort från storage om dokumentet sparas
		setImagesToDelete([...imagesToDelete, imageUrl]);
	}
	// Tar bort bilder som nyligen laddats upp men ej sparats till storage
	const deleteUploadedImage = (index: number, objUrl: string) => {
		setFileLimit(false);
		// Tar bort vald fil från listan med  biler
		setImages(() => images.filter((_, i) => i !== index))
		// Tar bort referens/förhandgranskning av bild från minnet.
		URL.revokeObjectURL(objUrl);
	}
	// Sorterar listan med bilder
	const sortImages = (indexOne: number, indexTwo: number) => {
		// Om det bara finns en bild i listan, return
		if (images.length < 2) {
			return;
		// Om bilden redan är "högst upp" i listan kan den inte flyttas högre, return.
		} else if (indexOne > indexTwo && indexOne < 1) {
			return;
		// Om bilden redan är sist i listan kan den inte flyttas längre ner, return
		} else if (indexOne < indexTwo && indexOne === images.length - 1) {
			return;
		}
		// Annars flytta bilden. Skapar först en kopia av listan.
		const arr = [...images];
		// Med hjälp av destrukturering byt plats på elementen i listan.
		[arr[indexOne], arr[indexTwo]] = [arr[indexTwo], arr[indexOne]];
		// Uppdatera state med den nya sorterade listan
		setImages(arr);
	};
		return (
			<div className={styles.imgDiv}>
				<h4 className={styles.h4}>Product images </h4>
				<p className={styles.pUploadDirections}>
					Upload product images and sort them in the order they will
					be displayed.{" "}
				</p>
				<p className={styles.pUploadedCount}>
					{images.length} / {MAX_UPLOAD_COUNT}
				</p>
				<SelectImageFiles
					images={images}
					setImages={setImages}
					fileLimit={fileLimit}
					setFileLimit={setFileLimit}
				/>
				<div className={styles.divThumbnails}>
					<ul className={styles.imgUl}>
						{images.length > 0 &&
							images.map((img, index) => {
								if (typeof img == "string") {
									return (
										<ImageThumbnail
											key={img}
											imageUrl={img}
											index={index}
											deleteImage={deleteImage}
											sortImages={sortImages}
										/>
									);
								} else {
									return (
										<FilePreview
											key={img.name}
											file={img}
											index={index}
											deleteUploadedImage={
												deleteUploadedImage
											}
											sortImages={sortImages}
										/>
									);
								}
							})}
					</ul>
				</div>
			</div>
		);
	
	
}

export default ImageUpload2;