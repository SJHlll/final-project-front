import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import Station from './Station';
import '../scss/ChargeStationList.scss';
import { SearchContext } from '../contexts/SearchContext';

const ChargeStationList = () => {
  const { searchConditions } = useContext(SearchContext);
  const {
    selectedArea,
    selectedSubArea,
    facilitySearch,
    isSearchClicked,
  } = searchConditions;
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 백엔드(데이터베이스)에서 받아온 충전소 데이터
  useEffect(() => {
    if (!isSearchClicked) return;

    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'http://localhost:8181/charge/home', // 현재 링크
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setStations(data.chargers);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchStations();
  }, [isSearchClicked]);

  const filteredStations = stations.filter((station) => {
    const isAreaMatch = selectedArea
      ? station.address.includes(selectedArea)
      : true;
    const isSubAreaMatch = selectedSubArea
      ? station.address.includes(selectedSubArea)
      : true;
    const isFacilityMatch = facilitySearch
      ? station.chargerName.includes(facilitySearch)
      : true;
    return isAreaMatch && isSubAreaMatch && isFacilityMatch;
  });

  if (!isSearchClicked) {
    return (
      <p
        style={{
          textAlign: 'center',
        }}
      >
        검색 조건을 입력해주세요.
      </p>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='ListContainer'>
      {filteredStations.length > 0 ? (
        filteredStations.map((station, index) => (
          <Station
            key={index}
            id={station.id}
            lat={station.latitude}
            lng={station.longitude}
            StationName={station.chargerName}
            StationAddress={station.address}
            AC={station.AC}
            DC={station.DC}
            index={station.index}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>
          조건에 맞는 충전소가 없습니다. 검색을 다시
          진행해주세요.
        </p>
      )}
    </div>
  );
};

export default ChargeStationList;
