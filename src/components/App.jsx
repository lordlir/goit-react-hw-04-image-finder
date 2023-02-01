import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { dataImages } from './api/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setSModal] = useState(false);
  const [modalImage, setMImg] = useState({
    currentImageUrl: null,
    currentImageDescription: null,
  });
  const [totalImages, setTImg] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onNewPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setSModal(prevSModal => !prevSModal);
  };

  const openModal = e => {
    if (e.target.nodeName === 'IMG') {
      setMImg({
        currentImageUrl: e.target.dataset.large,
        currentImageDescription: e.target.alt,
      });
      toggleModal();
    }
  };

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const dataImg = await dataImages(query, page);
        setImages(prevImg => [...prevImg, ...dataImg.hits]);
        setLoading(false);
        setTImg(dataImg.totalHits);
      } catch (error) {}
    };
    if (query) {
      search();
    }
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {!!images?.length && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images?.length < totalImages && <Button onClick={onNewPage} />}
      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={modalImage.currentImageUrl}
          currentImageDescription={modalImage.currentImageDescription}
        />
      )}
      <ToastContainer />
    </>
  );
};
