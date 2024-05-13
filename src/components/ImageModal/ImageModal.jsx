// import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageModal.module.css";

export default function ImageModal({ imgUrl }) {
  // console.log("items", items);
  // console.log("img", img);
  return (
    <div className={css.modalContainer}>
      <img src={imgUrl} alt="hello" className={css.image} />
    </div>
  );
}
