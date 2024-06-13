import { Button } from 'reactstrap';

const Btn = ({ toggleSearchBox, isSearchBoxVisible }) => {
  return (
    <>
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
        {isSearchBoxVisible ? '검색창 닫기' : '검색창 열기'}
      </Button>
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
