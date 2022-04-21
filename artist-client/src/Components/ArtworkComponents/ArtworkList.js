import { useEffect } from "react";
import { useSelector, useDispatch,shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";

const ArtworkList = () => {
  const artworks = useSelector(state=>state.artworks,shallowEqual);
  const dispatch = useDispatch();
  const { getArtworks } = bindActionCreators(artworkActionsCreators, dispatch);
  console.log(artworks);
  useEffect(() => {
    getArtworks();
  }, []);
  return <div></div>;
};

export default ArtworkList;
