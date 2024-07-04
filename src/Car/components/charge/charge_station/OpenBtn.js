import styles from '../scss/SearchList.module.scss';

const OpenBtn = ({
  toggleSearchBox,
  isSearchBoxVisible,
}) => {
  return (
    <>
      {/* 검색창 및 목록 열기/닫기 */}
      <div
        className={`${styles.openBtn} ${isSearchBoxVisible ? styles.hidden : styles.visible}`}
        onClick={toggleSearchBox}
      >
        {isSearchBoxVisible ? '>' : '<'}
      </div>
    </>
  );
};

export default OpenBtn;
