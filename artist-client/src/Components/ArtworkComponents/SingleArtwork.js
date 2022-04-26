import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import {
  artworkActionsCreators,
  favouriteActionsCreators,
} from "../../state/action-creators";
import styles from "./SingleArtwork.module.css";

const SingleArtwork = () => {
  const { artworkID } = useParams();
  const artwork = useSelector((state) => state.singleArtwork);
  const favouriteIDs = useSelector(
    (state) => state.favourites.map((art) => art.id),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { getSingleArtwork, addFavourite, removeFavourite } =
    bindActionCreators(
      Object.assign({}, favouriteActionsCreators, artworkActionsCreators),
      dispatch
    );
  useEffect(() => {
    if (!artwork || artworkID != artwork.id) {
      getSingleArtwork(artworkID);
    }
  }, []);
  if (!artwork || artwork.id != artworkID) {
    return (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    const notFavourite = favouriteIDs.indexOf(artwork.id) === -1;
    const chooseAction = () => {     
      notFavourite ? addFavourite(artwork) : removeFavourite(artwork.id);
    };

    const buttonContext = notFavourite ? "ADD" : "REMOVE";

    return (
      <div className={styles.singleArtworkContainer}>
        <div className={styles.artist}>
          <h1 className={styles.yellowTitle}>Artist</h1>
          <h3>{artwork.artist_title || "Unknown"}</h3>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={artwork.imageURL}
            alt={artwork.thumbnail.alt_text}
          />
        </div>
        <div className={styles.infos}>
          <h1 className={styles.yellowTitle}>{artwork.title}</h1>
          <div className={styles.infosDesc}>
            <ul>
              <li>
                <span className={styles.yellowTitle}>Place of Origin:</span>{" "}
                {artwork.place_of_origin}
              </li>
              <li>
                <span className={styles.yellowTitle}>Display type:</span>{" "}
                {artwork.medium_display}
              </li>
              <li>
                <span className={styles.yellowTitle}>Dimensions:</span>{" "}
                {artwork.dimensions}
              </li>
              <li>
                <span className={styles.yellowTitle}>Department:</span>{" "}
                {artwork.department_title}
              </li>
            </ul>
          </div>
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
      </div>
    );
  }
};

export default SingleArtwork;
