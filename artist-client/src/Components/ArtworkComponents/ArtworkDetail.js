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

  const chooseAction = () => {
    favouriteIDs.indexOf(item.id)===-1?addFavourite(item):removeFavourite(item.id);
    
  };
  console.log(item)
  const buttonContext=favouriteIDs.indexOf(item.id)===-1?"ADD":"REMOVE"
  return (
    <div className={styles.artworkDetailContainer}>
      <Link to={`/artwork/${item.id}`}>
        <h1>{item.title}</h1>
      </Link>

      <img className={styles.image} src={`${item.imageURL}`} alt={item.thumbnail?item.thumbnail.alt_text:""} />
      <div className={styles.btnContainer}>
        <button onClick={() => chooseAction()}>{buttonContext}</button>
      </div>
    </div>
  );
};

export default ArtworkDetail;
