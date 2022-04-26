/*This component needs some refactor*/

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import Controls from "../Controls/Controls";
import ReactPaginate from "react-paginate";
import ArtworkDetail from "./ArtworkDetail";
import { v4 as uuidv4 } from "uuid";
import styles from "./ArtworkList.module.css";


const FavouriteArtwork = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchedItems, setSearchedItems] = useState(null);
  const [search, setSearch] = useState(false);
  const [controlState, setControlState] = useState({
    searchValue: "",
    itemsPerPage: 25,
  });

  const favourites = useSelector((state) => state.favourites);
  const [currentFav, setCurrentFav] = useState(
    JSON.parse(JSON.stringify(favourites))
  );

  const handleChange = (e) => {
    setControlState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSearch = () => {
    setCurrentFav(() => {
      if (!controlState.searchValue) {
        setSearch(false);
        setSearchedItems(null);
        return favourites;
      } else {
        setSearch(true);
        return favourites.filter((fav) =>
          fav.title
            .toUpperCase()
            .includes(controlState.searchValue.toUpperCase())
        );
      }
    });
    if (!controlState.searchValue && !search) {
    } else {
      setSearchedItems(() => {
        return favourites.filter((fav) =>
          fav.title
            .toUpperCase()
            .includes(controlState.searchValue.toUpperCase())
        );
      });
    }
  };
  // Invoke when user click to request another page.
  const setUsersOnPageChange = () => {
    const endOffset = itemOffset + Number(controlState.itemsPerPage);
    if (!searchedItems) {
      setCurrentFav(
        JSON.parse(JSON.stringify(favourites)).slice(itemOffset, endOffset)
      );
      setPageCount(
        Math.ceil(favourites.length / Number(controlState.itemsPerPage))
      );
    } else {
      setCurrentFav(searchedItems.slice(itemOffset, endOffset));
      setPageCount(
        Math.ceil(searchedItems.length / Number(controlState.itemsPerPage))
      );
    }
  };
  const handlePageClick = (event) => {
    if (!searchedItems) {
      const newOffset =
        (event.selected * Number(controlState.itemsPerPage)) %
        favourites.length;
      setItemOffset(newOffset);
      setPageCount(event.selected + 1);
    } else {
      const newOffset =
        (event.selected * Number(controlState.itemsPerPage)) %
        searchedItems.length;
      setItemOffset(newOffset);

      setPageCount(event.selected + 1);
    }
  };

  useEffect(() => {
    setUsersOnPageChange();
  }, [itemOffset, controlState.itemsPerPage, favourites]);
  useEffect(() => {
    if (search) {
      setPageCount(
        Math.ceil(searchedItems.length / Number(controlState.itemsPerPage))
      );
    }
  }, [searchedItems, search]);
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
          itemsPerPage={Number(controlState.itemsPerPage)}
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
