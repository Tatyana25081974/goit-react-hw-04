import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={styles.btnContainer}>
      <button onClick={onClick} className={styles.loadMoreButton}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;