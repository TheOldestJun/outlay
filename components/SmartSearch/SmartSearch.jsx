import styles from "./SmartSearch.module.scss";

const SmartSearch = (props) => {
  return (
    <>
      <input
        type='search'
        className={styles.input}
        placeholder='Поиск...'
        onChange={(e) => {
          props.search(e.target.value.toLowerCase());
        }}
      />
    </>
  );
};

export default SmartSearch;
