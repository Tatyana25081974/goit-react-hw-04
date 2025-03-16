const ImageCard = ({ image, onImageClike }) => {
    return (
        <div onClick={() => onImageClike(image)}>
            <img src={image.urls.small} alt={image.alt_description} />
        </div>
    );
};
export default ImageCard;