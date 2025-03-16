import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import ImageModal from "./components/ImageModal";
import { fetchImages } from "./api/api"; // Імпортуємо API-запит

const App = () => {

  const [query, setQuery] = useState(""); // Пошуковий запит
const [images, setImages] = useState([]); // Масив зображень
const [page, setPage] = useState(1); // Номер сторінки для пагінації
const [loading, setLoading] = useState(false); // Стан завантаження
  const [error, setError] = useState(null); // Помилка при запиті
  const [selectedImage, setSelectedImage] = useState(null); // Обране зображення для модального вікна

  
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]); // Очищаємо попередні зображення при новому запиті
    setPage(1);
  };

  useEffect(() => {
  if (!query) return; // Якщо немає запиту, виходимо з useEffect

  const getImages = async () => {
    setLoading(true); // Починається завантаження
    setError(null); // Очищаємо можливі попередні помилки

    try {
      const data = await fetchImages(query, page); // Викликаємо API-запит
      setImages((prev) => [...prev, ...data.results]); // Додаємо нові фото до масиву
    } catch (error) {
      setError("Помилка завантаження зображень.");
    } finally {
      setLoading(false); // Завантаження закінчилося
    }
  };

  getImages(); // Викликаємо функцію для отримання фото
}, [query, page]); // Виконується при зміні query або page
   

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ImageGallery images={images} onImageClick={setSelectedImage} /> {/* Використовуємо ImageGallery */}

      {loading && <p>Завантаження...</p>}

      {images.length > 0 && !loading && (
        <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
      )}

      {/* Модальне вікно для перегляду фото у великому форматі */}
      <ImageModal image={selectedImage} isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
      
  );
};

export default App;
