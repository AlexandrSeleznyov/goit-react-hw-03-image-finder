import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ imageGallery, onClick }) {
  return (
    imageGallery.length !== 0 &&
    imageGallery.map((image) => (
      <li key={image.id} className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
          data-src={image.largeImageURL}
          onClick={() => onClick(image.largeImageURL, true)}
        />
      </li>
    ))
  );
}
ImageGalleryItem.propTypes = {
  imageGallery: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};
