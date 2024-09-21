import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Image, ResponseData } from "./types";
import "./App.module.css";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "ViO39Mn2xzED7Ft1F5gB4haKRWrh-yUwqfROBhPASKo";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (searchQuery: string, pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get<ResponseData>(API_URL, {
        params: {
          query: searchQuery,
          page: pageNumber,
          per_page: 12,
          client_id: ACCESS_KEY,
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
