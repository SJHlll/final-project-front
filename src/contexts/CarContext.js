import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [rentCar, setRentCar] = useState([]); // 차 목록을 보여주는 곳 (스위퍼)
  const [selectedCar, setSelectedCar] = useState(null); // 클릭된 차의 정보를 저장하는 곳
  const [carId, setCarId] = useState(''); // 차 아이디 가져오겠음
  const [reservedDates, setReservedDates] = useState([]);
  const [turninDate, setTurninDate] = useState();
  useEffect(() => {
    const fetchReservedDates = async () => {
      if (!selectedCar) return;

      try {
        console.log(
          `Fetching reserved dates for car ID: ${selectedCar.id}`,
        ); // 디버깅: car ID 확인
        const res = await fetch(
          `/rentcar/${selectedCar.id}`,
        );
        if (!res.ok)
          throw new Error('Failed to fetch reserved dates');

        const data = await res.json();
        console.log('Fetched data:', data); // 디버깅: 서버에서 받은 데이터 확인

        // 데이터가 예상 형식인지 확인
        const parsedDates = data.map(
          (date) => new Date(date),
        );
        console.log('Parsed Dates:', parsedDates); // 디버깅: 날짜로 변환된 데이터 확인
        console.log('turnindate:', turninDate);

        setReservedDates(parsedDates);
      } catch (error) {
        console.error(
          'Error fetching reserved dates:',
          error,
        );
      }
    };

    fetchReservedDates();
  }, [selectedCar]);

  return (
    <CarContext.Provider
      value={{
        carId,
        setCarId,
        rentCar,
        setRentCar,
        selectedCar,
        setSelectedCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
