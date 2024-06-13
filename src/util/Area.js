import React, { useEffect, useState } from 'react';
import { areas } from './areas';
import './Area.css';

const Area = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSubArea, setSelectedSubArea] = useState('');
  const [subAreas, setSubAreas] = useState([]);
  const [facilitySearch, setFacilitySearch] = useState('');

  // selectedArea(시/도)가 변경될 때 해당 지역의 subArea(시/군/구) 업데이트
  useEffect(() => {
    const foundArea = areas.find((area) => area.name === selectedArea);
    if (foundArea) {
      setSubAreas(foundArea.subArea);
    } else {
      setSubAreas([]);
    }
  }, [selectedArea]);

  // 시/도 변경 시 선택된 시/도 업데이트, 시/군/구 초기화
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea('');
  };

  // 시/군/구 변경 시 선택된 시/군/구 업데이트
  const handleSubAreaChange = (e) => {
    setSelectedSubArea(e.target.value);
  };

  // 검색 기능
  const handleFacilitySearchChange = (event) => {
    setFacilitySearch(event.target.value);
  };

  // 검색 버튼
  const handleSearch = () => {
    // (시/도) 선택 시
    if (selectedArea) {
      // (시/군/구) 선택 시
      if (selectedSubArea) {
        console.log(
          `${selectedArea} ${selectedSubArea} 내의 ${facilitySearch}충전소 검색`,
        );
        // (시/군/구) 미선택 시
      } else if (!selectedSubArea) {
        console.log(`${selectedArea} 내의 ${facilitySearch}충전소 검색`);
      }
      // 아무것도 안고를 시
    } else {
      alert('최소 시/도 구역까지 선택해주세요.');
    }
  };

  // 초기화 버튼
  const resetArea = (e) => {
    setSelectedArea('');
    setSelectedSubArea('');
    setFacilitySearch('');
  };

  return (
    <div className='area-selector'>
      <div className='box'>
        <select
          className='select-box'
          value={selectedArea}
          onChange={handleAreaChange}
        >
          <option value=''>시/도</option>
          {areas.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          className='select-box'
          value={selectedSubArea}
          onChange={handleSubAreaChange}
        >
          <option value=''>시/군/구</option>
          {subAreas.map((subArea) => (
            <option key={subArea} value={subArea}>
              {subArea}
            </option>
          ))}
        </select>
      </div>
      <div className='box'>
        <input
          className='search-input'
          type='text'
          placeholder='충전소 검색'
          value={facilitySearch}
          onChange={handleFacilitySearchChange}
        />
        <button className='button' onClick={handleSearch}>
          검색
        </button>
        <button className='button' onClick={resetArea}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default Area;
