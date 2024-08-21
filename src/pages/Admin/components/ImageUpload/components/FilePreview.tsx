import styles from "../image-upload.module.css";
import { getFileSize } from "src/utils/getFileSize";
import Modal from "../../Modal/Modal";
import { useState } from "react";

interface FilePreviewProps {
	file: File;
	index: number;
	deleteUploadedImage: (index: number, objUrl: string) => void;
	sortImages: (indexOne: number, indexTwo: number) => void;
}

const FilePreview = ({ file, index, sortImages, deleteUploadedImage }: FilePreviewProps) => {
	const [modal, setModal] = useState<boolean>(false)
	const objUrl = URL.createObjectURL(file);
	return (
		<li key={file.name} className={styles.previewImgLi}>
			<img className={styles.previewImg} src={objUrl} />
			<div className={styles.imgPreviewDetails}>
				<p className={styles.previemFileName}>
					<b>{index + 1}.</b>
				</p>
				<p className={styles.previemFileName}>New upload</p>
				<p className={styles.previewFileName}>Filename: {file.name}</p>
				<p className={styles.previewFileName}>
					Filesize: {getFileSize(file.size)}
				</p>
				<div className={styles.buttonsDiv}>
					<button
						type="button"
						onClick={() => setModal(true)}
						className={styles.deleteButton}
					>
						Delete
					</button>
					<button
						className={styles.arrowButton}
						onClick={() => sortImages(index, index - 1)}
					>
						&#8743;
					</button>
					<button
						className={styles.arrowButton}
						onClick={() => sortImages(index, index + 1)}
					>
						&#8744;
					</button>
				</div>
			</div>
			<Modal
				isOpen={modal}
				onConfirm={() => deleteUploadedImage(index, objUrl)}
				onCancel={() => setModal(false)}
				question="Delete image?"
			/>
		</li>
	);
}

export default FilePreview;