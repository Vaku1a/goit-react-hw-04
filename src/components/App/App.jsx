import { useEffect, useState } from "react";
import { fetchImages } from "../../images-api";
import Modal from "react-modal";
import { DNA } from "react-loader-spinner";

// components
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

// styles
import css from "../App/App.module.css";

Modal.setAppElement("#root");

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") return;

    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [page, query]);

  const handleOpenModal = (regular) => {
    setModalIsOpen(true);
    setImgUrl(regular);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={css.container}>
      <h1> What are you looking for?</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <b>Oops! Please reload...</b>}
      {isLoading && <DNA visible={true} />}
      {images.length > 0 && (
        <ImageGallery items={images} onOpenModal={handleOpenModal} />
      )}
      {images.length > 0 && <button onClick={handleLoadMore}>Load more</button>}
      {isLoading && <DNA visible={true} />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
      >
        <ImageModal imgUrl={imgUrl} />
      </Modal>
    </div>
  );
}

// useEffect(() => {
//   async function getImages() {
//     try {
//       setIsLoading(true);
//       const data = await fetchImages("Canada");
//       setImages(data);
//     } catch (error) {
//       console.log("error:", error);
//       setError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   getImages();
// }, []);
