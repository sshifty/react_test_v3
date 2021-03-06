import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { favouriteActionsCreators } from "../../state/action-creators";
import { Link } from "react-router-dom";
import styles from "./ArtworkDetail.module.css";

const ArtworkDetail = ({ item }) => {
  const favouriteIDs = useSelector(
    (state) => state.favourites.map((art) => art.id),
    shallowEqual
  );

  const dispatch = useDispatch();
  const { addFavourite, removeFavourite } = bindActionCreators(
    Object.assign({}, favouriteActionsCreators),
    dispatch
  );

  const notFavourite = favouriteIDs.indexOf(item.id) === -1;
  const chooseAction = () => {
    notFavourite ? addFavourite(item) : removeFavourite(item.id);
  };

  const buttonContext = notFavourite ? "ADD" : "REMOVE";
  return (
    <div className={styles.artworkDetailContainer}>
      <Link to={`/artwork/${item.id}`}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={`${item.imageURL}`}
            alt={item.thumbnail ? item.thumbnail.alt_text : item.title}
          />
        </div>

        <h1>{item.title}</h1>
      </Link>
      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${
            buttonContext === "ADD" ? styles.btnAdd : styles.btnRemove
          }`}
          onClick={() => chooseAction()}
        >
          {buttonContext}
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetail;
