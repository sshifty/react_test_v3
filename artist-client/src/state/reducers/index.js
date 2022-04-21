import { combineReducers } from "redux";
import artworkReducer from "./artworkReducer";

const reducers = combineReducers({
  artworks: artworkReducer,
});

export default reducers;
