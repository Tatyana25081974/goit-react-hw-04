import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ image, isOpen, onClose }) => {
  console.log("Rendering ImageModal", { image, isOpen });
  if (!image || !isOpen) return null; 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
     
    >
      {image?.urls && ( // Запобігає помилці, якщо `image` ще не завантажено
        <>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
            className={styles.image}
          />
          <p>Автор: {image.user?.name || "Невідомий"}</p>
          <p>Лайки: {image.likes || 0}</p>
          <button onClick={onClose} className={styles.closeButton}>Закрити</button>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
