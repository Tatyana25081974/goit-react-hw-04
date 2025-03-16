import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import { fetchImages } from "./api/api";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [query, setQuery] = useState(""); 
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim(); 

    if (trimmedQuery === query) {
      toast("Цей запит уже виконано!");
      return;
    }

    setQuery(trimmedQuery);
    setImages([]); 
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);

        if (!data.results.length) {
          setError("Зображень не знайдено!");
          setImages([]); 
          setTotalPages(1); 
          return;
        }

        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(Math.ceil(data.total / 20)); 
      } catch (error) {
        setError("Помилка завантаження зображень.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      
      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} onImageClick={setSelectedImage} />

      {loading && <Loader />}

      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}

      <ImageModal 
        image={selectedImage} 
        isOpen={Boolean(selectedImage)} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default App;
