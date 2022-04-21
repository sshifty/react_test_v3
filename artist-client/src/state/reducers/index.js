import { combineReducers } from "redux";
import artworkReducer from "./artworkReducer";

const reducers = combineReducers({
  allArtwork: artworkReducer,
});

export default reducers;
