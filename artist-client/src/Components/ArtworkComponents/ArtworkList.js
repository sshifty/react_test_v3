import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { artworkActionsCreators } from "../../state/action-creators";
import ArtworkDetail from "./ArtworkDetail";
import ReactPaginate from "react-paginate";
import styles from "./ArtworkList.module.css";
import Paginate from "./Paginate.css";

const ArtworkList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  //fix this
  const itemsPerPage = 25;
  const artworks = useSelector((state) => state.artworks, shallowEqual);

  const dispatch = useDispatch();
  const { getArtworks,getQueryArtwork } = bindActionCreators(artworkActionsCreators, dispatch);

  const setUsersOnPageChange = () => {
    setPageCount(
      Math.ceil(artworks ? artworks.pagination.total_pages : 1 / itemsPerPage)
    );
  };
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSubmit=e=>{
    e.preventDefault();   
    getQueryArtwork(searchValue);
  }
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
      <form onSubmit={onSubmit}>
        <input type="text"  onChange={handleChange
        }/>
      </form>
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
