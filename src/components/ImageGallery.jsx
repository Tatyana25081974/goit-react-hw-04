import ImageCard from "./ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
    if (images.lenght === 0) return null;

    return (
        <ul>
            {images.map((image) => (
                <li key={image.id}>
                    <ImageCard image={image} onImageClick={onImageClick} />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;