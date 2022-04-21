import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";
import ArtworkDetail from "./ArtworkDetail";
import ReactPaginate from "react-paginate";
import Paginate from "./Paginate.css";
import styles from "./ArtworkList.module.css";

const ArtworkList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 25;
  const artworks = useSelector((state) => state.artworks, shallowEqual);
  const dispatch = useDispatch();
  const { getArtworks } = bindActionCreators(artworkActionsCreators, dispatch);

  const setUsersOnPageChange = () => {
    setPageCount(
      Math.ceil(artworks ? artworks.pagination.total_pages : 1 / itemsPerPage)
    );
  };
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  useEffect(() => {
    getArtworks();
  }, []);
  useEffect(() => {
    setUsersOnPageChange();
  }, [itemsPerPage, artworks]);
  useEffect(() => {
    getArtworks(currentPage);
  }, [currentPage]);
  return (
    <div className={styles.artworkListContainer}>
      <div className={styles.artworkListDetails}>
        {artworks
          ? artworks.data.map((item) => {
              return <ArtworkDetail item={item} />;
            })
          : "Loading"}
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
};

export default ArtworkList;
