import { ARTWORK_FETCH_SINGLE } from "../typeConstants";

const singleArtworkReducer = (state = null, action) => {
  //maybe use cache later
  switch (action.type) {
    case ARTWORK_FETCH_SINGLE:
      return action.payload.data;
    default:
        return state;
  }
};

export default singleArtworkReducer;