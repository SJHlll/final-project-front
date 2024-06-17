import '../../scss/SearchList.scss';

const OpenBtn = ({
  toggleSearchBox,
  isSearchBoxVisible,
}) => {
  return (
    <>
      {/* 검색창 및 목록 열기/닫기 */}
      <div
        className={`open-btn ${isSearchBoxVisible ? 'visible' : 'hidden'}`}
        onClick={toggleSearchBox}
      >
        {isSearchBoxVisible ? '<' : '>'}
      </div>
    </>
  );
};

export default OpenBtn;
