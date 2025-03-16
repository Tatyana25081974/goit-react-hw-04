import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import { fetchImages } from "./api/api";

const App = () => {
  const [query, setQuery] = useState(""); // Пошуковий запит
  const [images, setImages] = useState([]); // Масив зображень
  const [page, setPage] = useState(1); // Номер сторінки
  const [loading, setLoading] = useState(false); // Чи йде завантаження
  const [error, setError] = useState(null); // Помилка
  const [selectedImage, setSelectedImage] = useState(null); // Вибране зображення для модального вікна

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]); // Очищаємо попередні зображення
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        console.log("Отримані дані:", data); 

        if (!data || !data.results || data.results.length === 0) {
          setError("Зображень не знайдено!");
           return;
    }
       setImages((prev) => [...prev, ...data.results]); 
    } catch (error) {
      console.error("Помилка завантаження:", error);
      setError("Помилка завантаження зображень.");
    } finally {
      setLoading(false);
    }
  };

  getImages();
}, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} onImageClick={setSelectedImage} />

      {loading && <Loader />}

      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}

      {selectedImage && (
        <ImageModal 
          key={selectedImage.id} // Унікальний ключ
          image={selectedImage} 
          isOpen={Boolean(selectedImage)} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div> 
  );
};

export default App;
