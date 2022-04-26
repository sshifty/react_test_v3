import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import Controls from "../Controls/Controls";
import ReactPaginate from "react-paginate";
import ArtworkDetail from "./ArtworkDetail";
import { v4 as uuidv4 } from "uuid";
import styles from "./ArtworkList.module.css";
import { fabClasses } from "@mui/material";

const FavouriteArtwork = () => {  
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [controlState, setControlState] = useState({
    searchValue: "",
    itemsPerPage: 25,
  });
 
  const favourites = useSelector((state) => state.favourites);
  const [currentFav, setCurrentFav] = useState(
    JSON.parse(JSON.stringify(favourites))
  );
  const setUsersOnPageChange = () => {
    const endOffset = itemOffset + controlState.itemsPerPage;
    setCurrentFav(JSON.parse(JSON.stringify(favourites)).slice(itemOffset, endOffset));   
    setPageCount(
      Math.ceil(favourites.length / controlState.itemsPerPage)
    );
  };
  const handleChange = (e) => {
    setControlState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSearch = () => {
    currentFav.filter((fav) =>
      fav.title.toUpperCase().includes(controlState.searchValue.toUpperCase())
    );
    setCurrentFav(() => {
      if (!controlState.searchValue) {
        return favourites;
      } else {
        return currentFav.filter((fav) =>
          fav.title
            .toUpperCase()
            .includes(controlState.searchValue.toUpperCase())
        );
      }
    });
  };
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * controlState.itemsPerPage) % currentFav.length;
    setItemOffset(newOffset);
    setPageCount(event.selected + 1);
  };

  useEffect(() => {   
    setUsersOnPageChange();
  }, [itemOffset,controlState.itemsPerPage, favourites]);
  if (!favourites) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.artworkListContainer}>
        <Controls
          handleChange={handleChange}
          onSearch={onSearch}
          itemsPerPage={controlState.itemsPerPage}
        />
        <div className={styles.artworkListDetails}>
          {currentFav.map((item) => {
            return <ArtworkDetail key={uuidv4()} item={item} />;
          })}
        </div>
        <ReactPaginate
          className={`${styles.paginate} react-paginate`}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
};

export default FavouriteArtwork;
