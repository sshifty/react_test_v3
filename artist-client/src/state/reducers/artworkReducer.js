import { ARTWORK_FETCHALL } from "../typeConstants";

const artworkReducer=(state=null,action)=>{
    switch(action.type){
        case ARTWORK_FETCHALL:
            return action.payload;
    }
}

export default artworkReducer;