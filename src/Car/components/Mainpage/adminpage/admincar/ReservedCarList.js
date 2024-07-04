import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReservedCarMap from './ReservedCarMap';
import ReservedStationSelect from '../adminstation/ReservedStationSelect';
import ReviewSelect from '../adminreview/ReviewSelect';
import ReviewList from '../adminreview/ReviewList';
import ReservedStationList from '../adminstation/ReservedStationList';

const ReservedCarList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };
  return (
    <Frame>
      <div className='admin-page-select'>
        <ReservedStationSelect
          isSelected={selected === 'station'}
          onClick={() =>
            handleSelect('station', '/admin/station')
          }
        />
        <div
          className={'admin-select reserve-car selected'}
        >
          예약된 렌트카
        </div>
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
        <div className='res-selected-name'>차종</div>
        <div className='res-selected-ad'>무언가</div>
        <div className='res-selected-time'>렌트기간</div>
        <div className='hidden-text'></div>
      </div>
      <div className='admin-page-list'>
        <div className='admin-list reserve-car'>
          <ReservedCarMap />
        </div>
        {selected === 'station' && <ReservedStationList />}
        {selected === 'review' && <ReviewList />}
      </div>
    </Frame>
  );
};

export default ReservedCarList;
