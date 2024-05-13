import css from "./ImageCard.module.css";

export default function ImageCard({
  item: {
    urls: { small, regular },
    description,
  },
  onOpenModal,
}) {
  return (
    <div className={css.imageContainer} onClick={() => onOpenModal(regular)}>
      <img src={small} alt={description} className={css.image} />
    </div>
  );
}
