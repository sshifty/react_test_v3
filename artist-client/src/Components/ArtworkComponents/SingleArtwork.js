/*Use custom hook for fetching data and store the data in local state*/
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";
import styles from "./SingleArtwork.module.css";

const SingleArtwork = () => {
  const { artworkID } = useParams();
  const artwork = useSelector((state) => state.singleArtwork);
  const dispatch = useDispatch();
  const { getSingleArtwork} = bindActionCreators(
    artworkActionsCreators,
    dispatch
  );
  useEffect(() => {
    if (!artwork || artworkID != artwork.data.id) {
      getSingleArtwork(artworkID);
    }
  }, []);

  if (!artwork || artwork.data.id != artworkID) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.singleArtworkContainer}>
        <div className={styles.artist}>
          <h1>Artist</h1>
          <h3>{artwork.artist ? artwork.artist.title : "Unknown"}</h3>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={artwork.imageURL}
            alt={artwork.data.thumbnail.alt_text}
          />
        </div>
        <div className={styles.infos}>
          <h1>{artwork.data.title}</h1>
          <div className={styles.infosDesc}></div>
        </div>
      </div>
    );
  }
};

export default SingleArtwork;
