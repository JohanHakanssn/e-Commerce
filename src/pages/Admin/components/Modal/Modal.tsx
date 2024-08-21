import { useRef, useEffect } from "react";
import "./modal.css";


interface ModalProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	question: string;
}


const Modal = ({ isOpen, question, onConfirm, onCancel }: ModalProps) => {
	const ref: React.MutableRefObject<HTMLDialogElement> = useRef();
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Escape") {
			onCancel();
		}
	};
	useEffect(() => {
		if (isOpen) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [isOpen])
	if (!isOpen) return null;
	return (
		<dialog
			ref={ref}
			onCancel={() => onCancel}
			onKeyDown={handleKeyDown}
			className="modal-dialog"
			aria-modal="true"
			aria-labelledby="dialog-title"
		>
			<h2 id="dialog-title" className="modal-title">
				{question}
			</h2>
			<div className="modal-button-container">
				<button onClick={onConfirm} className="modal-button">
					Yes
				</button>
				<button onClick={onCancel} className="modal-button">
					No
				</button>
			</div>
		</dialog>
	);
}

export default Modal;