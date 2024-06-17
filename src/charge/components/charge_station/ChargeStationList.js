import React, { useContext } from 'react';
import Station from './Station';
import '../../scss/ChargeStationList.scss';
import { areas } from './areas';
import { SearchContext } from './contexts/SearchContext';

const ChargeStationList = () => {
  const { searchConditions } = useContext(SearchContext);
  const { selectedArea, selectedSubArea, facilitySearch } =
    searchConditions;
  const isInitialSearch =
    !selectedArea && !selectedSubArea && !facilitySearch;

  const filteredStations = areas.filter((station) => {
    const isAreaMatch = selectedArea
      ? station.StationAddress.includes(selectedArea)
      : true;
    const isSubAreaMatch = selectedSubArea
      ? station.StationAddress.includes(selectedSubArea)
      : true;
    const isFacilityMatch = facilitySearch
      ? station.StationName.includes(facilitySearch)
      : true;
    return isAreaMatch && isSubAreaMatch && isFacilityMatch;
  });

  return (
    <div className='ListContainer'>
      {isInitialSearch ? (
        <div>
          <p
            style={{
              textAlign: 'center',
            }}
          >
            검색 결과가 없습니다. 행정구역 시/도를
            지정해주세요.
          </p>
          <hr />
          <p>현재 더미데이터</p>
          <p>
            한국ICT인재개발원 신촌센터 / 서울특별시 마포구
          </p>
          <p>국회의사당 / 서울특별시 영등포구</p>
          <p>청와대 / 서울특별시 종로구</p>
          <p>반포자이 / 서울특별시 서초구</p>
          <p>
            서울교통공사 군자차량사업소 / 서울특별시 성동구
          </p>
          <p>서울삼성동우체국 / 서울특별시 강남구</p>
        </div>
      ) : filteredStations.length > 0 ? (
        filteredStations.map((station, index) => (
          <Station
            key={index}
            id={station.id}
            lat={station.lat}
            lng={station.lng}
            StationName={station.StationName}
            StationAddress={station.StationAddress}
            AC={station.AC}
            DC={station.DC}
            index={station.index}
          />
        ))
      ) : (
        <p
          style={{
            textAlign: 'center',
          }}
        >
          조건에 맞는 충전소가 없습니다. 검색을 다시
          진행해주세요.
        </p>
      )}
    </div>
  );
};

export default ChargeStationList;
