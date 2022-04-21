import { combineReducers } from "redux";
import artworkReducer from "./artworkReducer";
import favouriteReducer from "./favouriteReducer";
const reducers = combineReducers({
  artworks: artworkReducer,
  favourites: favouriteReducer,
});

export default reducers;
