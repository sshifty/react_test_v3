import { ARTWORK_FETCHALL } from "../typeConstants";

const artworkReducer = (state = null, action) => {
  switch (action.type) {
    case ARTWORK_FETCHALL:
      return {
        ...action.payload,
        data: action.payload.data.map((item) => {
          return {
            ...item,
            imageURL: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
          };
        }),
      };  

    default:
      return state;
  }
};

export default artworkReducer;
