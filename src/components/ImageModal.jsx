import Modal from "react-modal";

// Встановлюємо головний елемент для доступності (потрібно для React Modal)
Modal.setAppElement("#root");

const ImageModal = ({ image, isOpen, onClose }) => {
  if (!image) return null; // Якщо фото немає, не рендеримо вікно

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      contentLabel="Image Modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center"
        }
      }}
    >
      <div>
        <img src={image.urls.regular} alt={image.alt_description} style={{ maxWidth: "100%", maxHeight: "80vh" }} />
        <p>Автор: {image.user.name}</p>
        <p>Лайки: {image.likes}</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </Modal>
  );
};

export default ImageModal;
