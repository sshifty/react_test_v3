import styles from "./Controls.module.css";

const Controls = ({ handleChange, onSearch, itemsPerPage }) => {
  const array = [];
  for (let i = 5; i <= 100; i += 5) {
    array.push(i);
  }

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.inputContainer}>
        <input onChange={handleChange} name="searchValue" type="text" />
      </div>
      <div className={styles.inputContainer}>
        <select onChange={handleChange} name="itemsPerPage" id="itemsPerPage">
          {array.map((i) => {
            return (
              <option value={i} selected={itemsPerPage === i ? "selected" : ""}>
                {i}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={onSearch}>search</button>
    </div>
  );
};

export default Controls;
