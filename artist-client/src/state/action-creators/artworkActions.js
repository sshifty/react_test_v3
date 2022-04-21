import { ARTWORK_FETCHALL } from "../typeConstants";

export const getArtworks = (page = 1, pageLimit = 25) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(
        `https://api.artic.edu/api/v1/artists?page=${page}&limit=${pageLimit}`
      );
      const data = await resp.json();
      return dispatch({
        type: ARTWORK_FETCHALL,
        payload: data,
      });
    } catch (e) {
      //handle error somehow
      console.log(e);
    }
  };
};
