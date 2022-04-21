import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from 'react';
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";
import styles from './SingleArtwork.module.css';

const SingleArtwork = () => {
  const { artworkID } = useParams();
  const artwork=useSelector(state=>state.singleArtwork);
  const dispatch = useDispatch();
  const { getSingleArtwork } = bindActionCreators(
    artworkActionsCreators,
    dispatch
  );
  useEffect(()=>{
    getSingleArtwork(artworkID)
  },[])
  console.log(artwork)
  return <div className={styles.singleArtworkContainer}>

  </div>;
};

export default SingleArtwork;
