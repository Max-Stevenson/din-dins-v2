import React, { useState } from "react";
import "./DeleteConfirmationModal.scss";

function DeleteConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = () => {
    closeModal();
  };

  return (
    <>
      <button type="button" onClick={openModal}>Delete</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Confirm Deletion</h2>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <p className="modal-message">Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button type="button" onClick={handleDelete}>Yes, delete it</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmationModal;