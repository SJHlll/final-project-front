import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReviewMap from './ReviewMap';
import ReservedStationSelect from '../adminstation/ReservedStationSelect';
import ReservedCarSelect from '../admincar/ReservedCarSelect';
import ReservedStationList from '../adminstation/ReservedStationList';
import ReservedCarList from '../admincar/ReservedCarList';
import { TestRvProvider } from './TestRvContext';

const ReviewList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };
  return (
    <TestRvProvider>
      <Frame>
        <div className='admin-page-select'>
          <ReservedStationSelect
            isSelected={selected === 'station'}
            onClick={() =>
              handleSelect('station', '/admin/station')
            }
          />
          <ReservedCarSelect
            isSelected={selected === 'car'}
            onClick={() =>
              handleSelect('car', '/admin/car')
            }
          />
          <div className={'admin-select review selected'}>
            작성된 리뷰
          </div>
        </div>
        <div className='admin-page-list'>
          <div className='admin-list review'>
            <div className='list-header'>
              <div className='res-no'>번호</div>
              <div className='res-user-name'>회원명</div>
              <div
                className='res-selected-ad'
                style={{
                  fontSize: '0.83em',
                  lineHeight: '31px',
                }}
              >
                충전소/렌트카
              </div>
              <div className='res-selected-name'>
                리뷰내용
              </div>
              <div className='res-selected-time'>
                작성날짜
              </div>
              <div className='hidden-text'></div>
            </div>
            <ReviewMap />
          </div>
          {selected === 'station' && (
            <ReservedStationList />
          )}
          {selected === 'car' && <ReservedCarList />}
        </div>
      </Frame>
    </TestRvProvider>
  );
};

export default ReviewList;
