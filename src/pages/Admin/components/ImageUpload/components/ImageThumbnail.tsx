import styles from "../image-upload.module.css";
import Modal from "../../Modal/Modal";
import { useState } from "react";

interface ImageThumbnailProps {
	imageUrl: string;
	index: number;
	deleteImage: (img: number) => void;
	sortImages: (indexOne: number, indexTwo: number) => void;
}

const ImageThumbnail = ({ imageUrl, index, deleteImage, sortImages }: ImageThumbnailProps) => {
	const [modal, setModal] = useState<boolean>(false)
	return (
		<li className={styles.previewImgLi}>
			<img className={styles.previewImg} src={imageUrl} />
			<div className={styles.imgPreviewDetails}>
				<p className={styles.previemFileName}>
					<b>{index + 1}.</b>
				</p>
				<div className={styles.buttonsDiv}>
					<button
						type="button"
						onClick={() => setModal(true)}
						className={styles.deleteButton}
					>
						Delete
					</button>
					{/* Up */}
					<button
						className={styles.arrowButton}
						onClick={() => sortImages(index, index - 1)}
					>
						&#8743;
					</button>
					{/* Down */}
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
				onConfirm={() => deleteImage(index)}
				onCancel={() => setModal(false)}
				question="Delete image?"
			/>
		</li>
	);
}
export default ImageThumbnail;