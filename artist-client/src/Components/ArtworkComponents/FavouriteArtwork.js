import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { favouriteActionsCreators } from "../../state/action-creators";
import ArtworkDetail from "./ArtworkDetail";

const FavouriteArtwork = () => {
  const favourites = useSelector((state) => state.favourites);

  if (!favourites) {
    return <div>Loading</div>;
  } else {
    return <div>
        {favourites.map(item=>{
            return <ArtworkDetail item={item} />
        })}
    </div>;
  }
};

export default FavouriteArtwork;
