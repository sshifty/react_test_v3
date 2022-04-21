import styles from "./ArtworkDetail.module.css";

const ArtworkDetail = ({ item }) => {
  return (
    <div className={styles.artworkDetailContainer}>
      <h1>{item.title}</h1>

      <img className={styles.image} src={`${item.imageURL}`} alt={item.title} />
      <div className={styles.btnContainer}>
          <button>XD</button>
      </div>
    </div>
  );
};

export default ArtworkDetail;
