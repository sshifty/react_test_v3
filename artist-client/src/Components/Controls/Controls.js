import styles from "./Controls.module.css";

const Controls = () => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.inputContainer}>

        <input type="text" />
      </div>
      <div className={styles.inputContainer}>
        <input type="number" placeholder="xd"/>
      </div>
    </div>
  );
};

export default Controls;
