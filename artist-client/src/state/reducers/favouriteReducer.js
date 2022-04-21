import { FAVOURITE_REMOVE, FAVOURITE_ADD } from "../typeConstants";

const initState = () => {
  return JSON.parse(localStorage.getItem("favouriteArt")) || [];
};
const favouriteReducer = (state = initState(), action) => {
  const tempState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case FAVOURITE_ADD:
      tempState.push(action.payload);
      localStorage.setItem("favouriteArt", JSON.stringify(tempState));
      return tempState;
    case FAVOURITE_REMOVE:
      const removedArray = tempState.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favouriteArt", JSON.stringify(removedArray));
      return removedArray;
    default:
      return state;
  }
};

export default favouriteReducer;
