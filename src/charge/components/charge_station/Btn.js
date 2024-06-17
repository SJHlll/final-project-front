import { Button } from 'reactstrap';

const Btn = ({ toggleSearchBox, isSearchBoxVisible }) => {
  return (
    <>
      {/* 검색창 및 목록 열기 */}
      <Button
        type='submit'
        variant='contained'
        style={{
          background: '#CCCCCC',
          width: '250px',
          height: '50px',
          fontSize: '1.15rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={toggleSearchBox}
      >
        {isSearchBoxVisible
          ? '충전소 검색창 닫기'
          : '충전소 검색창 열기'}
      </Button>
      {/* 에약창 이동하기, 아직 미구현 */}
      <Button
        type='submit'
        variant='contained'
        style={{
          background: '#A9F5F2',
          width: '250px',
          height: '50px',
          fontSize: '1.15rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Plug & Go 충전소 예약하기
      </Button>
    </>
  );
};

export default Btn;
