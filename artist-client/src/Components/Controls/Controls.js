import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuidv4 } from "uuid";
import styles from "./Controls.module.css";

const Controls = ({ handleChange, onSearch, itemsPerPage }) => {
  const array = [];
  for (let i = 5; i <= 100; i += 5) {
    array.push(i);
  }

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlsInside}>
        <div className={styles.controlsInput}>
          <div className={styles.inputContainer}>
            <div className={styles.searchContainer}>
              <input
                onChange={handleChange}
                name="searchValue"
                type="text"
                placeholder="Search by title"
              />
              <SearchIcon />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <select
              onChange={handleChange}
              name="itemsPerPage"
              id="itemsPerPage"
            >
              {array.map((i) => {
                return (
                  <option
                    key={uuidv4()}
                    value={i}
                    selected={itemsPerPage === i ? "selected" : ""}
                  >
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button className={styles.btn} onClick={onSearch}>
          search
        </button>
      </div>
    </div>
  );
};

export default Controls;
