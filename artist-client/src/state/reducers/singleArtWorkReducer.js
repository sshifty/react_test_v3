import { ARTWORK_FETCH_SINGLE ,ARTWORK_RESET} from "../typeConstants";

const singleArtworkReducer = (state = null, action) => {
  //maybe use cache later
  switch (action.type) {
    case ARTWORK_FETCH_SINGLE:
      return {
        ...action.payload,
        imageURL: `https://www.artic.edu/iiif/2/${action.payload.data.image_id}/full/843,/0/default.jpg`,
      };
    case ARTWORK_RESET:
      return  {}
    default:
      return state;
  }
};

export default singleArtworkReducer;
