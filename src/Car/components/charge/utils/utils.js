// 충전소 중복된 주소 제거 처리 함수
export const removeDuplicates = (stations) => {
  const uniqueStations = [];
  const address = new Set();

  stations.forEach((station) => {
    if (!address.has(station.address)) {
      uniqueStations.push(station);
      address.add(station.address);
    }
  });

  return uniqueStations;
};
