import { FAVOURITE_REMOVE, FAVOURITE_ADD } from "../typeConstants";

export const addFavourite=art=>{
    return dispatch=>{
        dispatch({
            type:FAVOURITE_ADD,
            payload:art
        })
    }
}

export const removeFavourite=artID=>{
    return dispatch=>{
        dispatch({
            type:FAVOURITE_REMOVE,
            payload:artID
        })
    }
}