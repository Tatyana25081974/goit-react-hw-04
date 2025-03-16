import styles from "./ImageGallery.module.css";
import ImageCard from "./ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li 
          key={image.id} 
          onClick={() => onImageClick(image)} 
          className={styles.listItem} 
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;