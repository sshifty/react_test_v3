import { combineReducers } from "redux";
import artworkReducer from "./artworkReducer";
import favouriteReducer from "./favouriteReducer";
import singleArtworkReducer from "./singleArtWorkReducer";
const reducers = combineReducers({
  artworks: artworkReducer,
  favourites: favouriteReducer,
  singleArtwork:singleArtworkReducer
});

export default reducers;
