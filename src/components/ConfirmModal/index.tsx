import React from 'react';
import './ConfirmModal.scss';

interface ConfirmModalProps {
	isOpen: boolean;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	message,
	onConfirm,
	onCancel,
}) => {
	if (!isOpen) return null;

	const handleCloseModal = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).classList.contains('confirm-modal')) {
		onCancel();
		}
	};

	return (
		<div className="confirm-modal" onClick={handleCloseModal}>
		<div className="confirm-modal-content">
			<p>{message}</p>
			<button onClick={onConfirm}>Yes</button>
			<button onClick={onCancel}>No</button>
		</div>
		</div>
	);
};

export default ConfirmModal;
