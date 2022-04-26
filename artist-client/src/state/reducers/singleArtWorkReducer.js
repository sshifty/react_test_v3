import { ARTWORK_FETCH_SINGLE } from "../typeConstants";

const singleArtworkReducer = (state = null, action) => {
  //maybe use cache later
  switch (action.type) {
    case ARTWORK_FETCH_SINGLE:
      return {
        ...action.payload.data,
        imageURL: `https://www.artic.edu/iiif/2/${action.payload.data.image_id}/full/843,/0/default.jpg`,
      };
    default:
      return state;
  }
};

export default singleArtworkReducer;
