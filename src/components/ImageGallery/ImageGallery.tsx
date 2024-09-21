import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../../types";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={styles.list}>
      {images.map((image) => (
        <li
          className={styles.item}
          key={image.id}
          // onClick={() => onImageClick(image)}
        >
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
