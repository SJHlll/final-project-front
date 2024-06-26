import React, { useContext, useEffect } from 'react';
import { StationContext } from '../contexts/StationContext';
import PlugAndGoStation from './PlugAndGoStation';
import PlugAndGoMap from './PlugAndGoMap';
import styled from 'styled-components';

const PlugAndGoStationContainer = styled.div`
  width: 850px;
  display: flex;
  flex-wrap: wrap;
  max-height: 676px;
  overflow-y: auto;

  // 스크롤바 몸통
  &::-webkit-scrollbar {
    width: 8px;
  }

  // 스크롤바 배경
  &::-webkit-scrollbar-track {
    background: #c2e1ff;
  }

  // 스크롤바 위치
  &::-webkit-scrollbar-thumb {
    background: #2c7fdf;
  }

  // 스크롤바 호버
  &::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
`;

const ReservationList = () => {
  const { stations, setStations } =
    useContext(StationContext);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/charge/reservation',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        console.log(data); // 데이터 형식 확인
        setStations(data.chargers || []); // 올바른 데이터 설정
      } catch (error) {
        console.error(error);
      }
    };
    fetchStations();
  }, []);

  return (
    <>
      {/* 우리 충전소 목록(카드) 정리 */}
      <PlugAndGoStationContainer>
        {stations.map((station) => (
          <PlugAndGoStation
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
      </PlugAndGoStationContainer>
      <PlugAndGoMap markers={stations} />
    </>
  );
};

export default ReservationList;
