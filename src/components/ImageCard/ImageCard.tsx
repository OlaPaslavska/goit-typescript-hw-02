import React from "react";
import { Image } from "../../types";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={styles.imageContainer} onClick={() => onClick(image)}>
      <img
        className={styles.imageCard}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
