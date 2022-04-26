import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";
import ArtworkDetail from "./ArtworkDetail";
import ReactPaginate from "react-paginate";
import styles from "./ArtworkList.module.css";
import Controls from "../Controls/Controls";
import Paginate from "./Paginate.css";

const ArtworkList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [controlState, setControlState] = useState({
    searchValue: "",
    itemsPerPage: 25,
  });
 

  const artworks = useSelector((state) => state.artworks, shallowEqual);

  const dispatch = useDispatch();
  const { getArtworks, getQueryArtwork } = bindActionCreators(
    artworkActionsCreators,
    dispatch
  );

  const setUsersOnPageChange = () => {
    setPageCount(
      Math.ceil(
        artworks
          ? artworks.pagination.total_pages
          : 1 / controlState.itemsPerPage
      )
    );
  };
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const onSearch = () => {
    if (controlState.searchValue) {
      getQueryArtwork(controlState.searchValue, 1, controlState.itemsPerPage);
    } else {
      getArtworks(currentPage, controlState.itemsPerPage);
    }
  };
  const handleChange = (e) => {
    setControlState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    getArtworks();
  }, []);
  useEffect(() => {
    setUsersOnPageChange();
  }, [controlState.itemsPerPage, artworks]);
  useEffect(() => {
    if (controlState.searchValue) {
      getQueryArtwork(
        controlState.searchValue,
        currentPage,
        controlState.itemsPerPage
      );
    } else {
      getArtworks(currentPage, controlState.itemsPerPage);
    }
  }, [currentPage, controlState.itemsPerPage]);
  if (!artworks) {
    return (
      <div className={styles.loading}>
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
          {artworks.data.map((item) => {
            return <ArtworkDetail item={item} />;
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

export default ArtworkList;
