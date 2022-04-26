import {
  ARTWORK_FETCHALL,
  ARTWORK_FETCH_SINGLE,
  ARTWORK_RESET,
} from "../typeConstants";

export const getArtworks = (page = 1, pageLimit = 25) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${pageLimit}&fields=id,title,image_id,thumbnail`
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

export const getSingleArtwork = (artID) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(
        `https://api.artic.edu/api/v1/artworks/${artID}`
      );
      const data = await resp.json();
      return dispatch({
        type: ARTWORK_FETCH_SINGLE,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getQueryArtwork = (searchValue, page = 1, pageLimit = 25) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}&query[term][is_public_domain]=true&limit=${pageLimit}&page=${page}&fields=image_id,title,thumbnail`
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
