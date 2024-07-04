import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import Station from './Station';
import styles from '../scss/ChargeStationList.module.scss';
import { SearchContext } from '../../../../contexts/SearchContext';
import { StationContext } from '../../../../contexts/StationContext';
import { removeDuplicates } from '../utils/utils';
import loadingImg from '../assets/img/loading.png';
import haversine from 'haversine';

const ChargeStationList = () => {
  const { searchConditions } = useContext(SearchContext);
  const {
    selectedArea,
    selectedSubArea,
    facilitySearch,
    isAvailableOnly,
    isSearchClicked,
  } = searchConditions;
  const {
    stations,
    setStations,
    visibleCount,
    setVisibleCount,
  } = useContext(StationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [centerCoords] = useState({
    latitude: 37.552484,
    longitude: 126.937641,
  });

  // 백엔드(데이터베이스)에서 받아온 충전소 데이터
  useEffect(() => {
    if (!isSearchClicked) return;

    const fetchStations = async () => {
      // 로딩중이다
      setIsLoading(true);
      setError(null);
      // 불러왔다
      try {
        const response = await fetch(
          'http://localhost:8181/charge/list', // 현재 링크
        );
        // 에러떴다
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }

        const data = await response.json();
        const uniqueStations = removeDuplicates(
          data.chargers,
        );
        setStations(uniqueStations);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchStations();
  }, [isSearchClicked]);

  // 시/도, 시/군/구, 키워드 검색 함수
  const filteredStations = stations.filter((station) => {
    // 데이터베이스 주소, 시/도 매치
    const isAreaMatch = selectedArea
      ? station.province === selectedArea
      : true;
    // 데이터베이스 주소, 시/군/구 매치
    const isSubAreaMatch = selectedSubArea
      ? station.districts === selectedSubArea
      : true;
    // 데이터베이스 이름, 검색어 매치
    const isFacilityMatch = facilitySearch
      ? station.stationName.includes(facilitySearch)
      : true;
    // 이용 가능한 충전소 필터
    const isAvailableMatch = isAvailableOnly
      ? station.available === '이용가능'
      : true;
    return (
      isAreaMatch &&
      isSubAreaMatch &&
      isFacilityMatch &&
      isAvailableMatch
    );
  });

  // 검색을 안한 초기 상태
  if (!isSearchClicked) {
    return (
      <p className='list-content'>
        검색 조건을 입력해주세요.
      </p>
    );
  }

  // 충전소 데이터 불러오는 상태
  if (isLoading) {
    return (
      <div>
        <p className={styles.listContent}>
          충전소 정보를 불러오는 중...
        </p>
        <p className={styles.listContent}>
          <img
            className={styles.loading}
            src={loadingImg}
            alt='Loading'
          />
        </p>
      </div>
    );
  }

  // 에러
  if (error) {
    return <p className='list-content'>Error: {error}</p>;
  }

  // 더 보기 버튼 클릭 시 20개씩 더 보여주는 함수
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
    console.log(centerCoords);
  };

  // 중심 좌표에서 가까운 순으로 충전소 정렬
  const sortedStations = filteredStations
    .map((station) => ({
      ...station,
      distance: haversine(centerCoords, {
        latitude: station.latitude,
        longitude: station.longitude,
      }),
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className={styles.ListContainer}>
      {sortedStations.length > 0 ? (
        <>
          {sortedStations
            .slice(0, visibleCount)
            .map((station) => (
              <Station
                // Id={station.id} // 데이터베이스 id
                StationId={station.stationId} // 충전기 id
                Name={station.stationName} // 충전소 이름
                Address={station.address} // 충전소 주소
                Speed={station.speed} // 완속 or 급속
                Type={station.chargerType} // 충전기 타입
                Management={station.management} // 충전기 회사
                areaIn={station.areaIn} // 이용 시설
                Available={station.available} // 이용자 제한 or 이용 가능
                price={station.chargingPrice} // 충전 가격
                lat={station.latitude} // 위도
                lng={station.longitude} // 경도
              />
            ))}
          {visibleCount < filteredStations.length && (
            <div
              onClick={handleShowMore}
              className={styles.showMoreButton}
            >
              {' '}
              &darr; 더 보기 &darr;
            </div>
          )}
        </>
      ) : (
        <p className={styles.listContent}>
          조건에 맞는 충전소가 없습니다. 검색을 다시
          진행해주세요.
        </p>
      )}
    </div>
  );
};

export default ChargeStationList;
