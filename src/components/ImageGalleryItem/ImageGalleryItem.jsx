import PropTypes from 'prop-types';
import s from '././ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <li className={s.item} onClick={openModal}>
      <img
        className={s.img}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
