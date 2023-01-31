import React, { Component, useEffect, useState } from 'react';
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
  const [images, setImages] = useState(null);
  const [showModal, setSModal] = useState(false);
  const [modalImage, setMImg] = useState({
    currentImageUrl: null,
    currentImageDescription: null,
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setMImg({
        currentImageUrl,
        currentImageDescription,
      });
      toggleModal();
    }
  };

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const dataImg = await dataImages(query, page);
        console.log(dataImg);
        setImages(dataImg.hits);
        setLoading(false);
      } catch (error) {}
    };
    if (query) {
      search();
    }
  }, [query]);
  // console.log(images);
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {!!images?.length && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {/* {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNewPage={onNewPage} />
      )} */}
      {showModal && (
        <Modal
          onClose={toggleModal}
          // currentImageUrl={currentImageUrl}
          // currentImageDescription={currentImageDescription}
        />
      )}
      <ToastContainer />
    </>
  );
};

/* export class App extends Component {
  state = {
    query: '',
    page: 1,
    totalImages: 0,
    showModal: false,
    imagesOnPage: 0,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      dataImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );
          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      dataImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  onNewPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      isLoading,
      totalImages,
      imagesOnPage,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const openModal = this.openModal;
    const toggleModal = this.toggleModal;
    const onNextFetch = this.onNextFetch;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {images && <ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}
        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}
        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <ToastContainer />
      </>
    );
  }
}
*/
