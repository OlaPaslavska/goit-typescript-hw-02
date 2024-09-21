import React from "react";
import styles from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

// Визначаємо тип для зображення
interface User {
  name: string;
}

interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
  user: User;
  likes?: number;
  description?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.customStyles}
      overlayClassName={styles.overlay}
    >
      {image && (
        <div className={styles.modalImageContainer}>
          <img
            className={styles.modalImageCard}
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <div className={styles.dataImage}>
            <h2>
              Description:
              {image.description || image.alt_description || "No Description"}
            </h2>
            <p>
              <strong>Author:</strong> {image.user.name}
            </p>
            <p>
              <strong>Likes:</strong> {image.likes}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
