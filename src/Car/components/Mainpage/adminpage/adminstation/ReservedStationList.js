import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReservedStationMap from './ReservedStationMap';
import ReservedCarSelect from '../admincar/ReservedCarSelect';
import ReviewSelect from '../adminreview/ReviewSelect';
import ReservedCarList from '../admincar/ReservedCarList';
import ReviewList from '../adminreview/ReviewList';
import { ReserveStationProvider } from '../../../../../contexts/ReserveStationContext';

const ReservedStationList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };
  return (
    <ReserveStationProvider>
      <Frame>
        <div className='admin-page-select'>
          <div
            className={
              'admin-select reserve-station selected'
            }
          >
            예약된 충전소
          </div>
          <ReservedCarSelect
            isSelected={selected === 'car'}
            onClick={() =>
              handleSelect('car', '/admin/car')
            }
          />
          <ReviewSelect
            isSelected={selected === 'review'}
            onClick={() =>
              handleSelect('review', '/admin/review')
            }
          />
        </div>
        <div className='list-header'>
          <div className='res-no'>번호</div>
          <div className='res-user-name'>회원명</div>
          <div className='res-selected-name'>충전소</div>
          <div className='res-selected-ad'>충전비용</div>
          <div className='res-selected-time'>충전기간</div>
          <div className='hidden-text'></div>
        </div>
        <div className='admin-page-list'>
          <div className='admin-list reserve-station'>
            <ReservedStationMap />
          </div>
          {selected === 'car' && <ReservedCarList />}
          {selected === 'review' && <ReviewList />}
        </div>
      </Frame>
    </ReserveStationProvider>
  );
};

export default ReservedStationList;
