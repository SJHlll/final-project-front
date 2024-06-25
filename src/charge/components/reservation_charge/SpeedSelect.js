import React, { useEffect, useState } from 'react';
import '../scss/SpeedSelect.scss';

const SpeedSelect = ({ speed }) => {
  const [selectedOption, setSelectedOption] =
    useState('option1');

  const handlerRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (speed === '급속') {
      setSelectedOption('option1');
    } else if (speed === '완속') {
      setSelectedOption('option2');
    }
  }, [speed]);

  const FAST = [
    { value: '10', name: '10분' },
    { value: '20', name: '20분' },
    { value: '30', name: '30분' },
    { value: '40', name: '40분' },
    { value: '50', name: '50분' },
    { value: '60', name: '60분' },
  ];

  const SLOW = [
    { value: '1', name: '1시간' },
    { value: '2', name: '2시간' },
    { value: '3', name: '3시간' },
    { value: '4', name: '4시간' },
    { value: '5', name: '5시간' },
    { value: '6', name: '6시간' },
    { value: '7', name: '7시간' },
    { value: '8', name: '8시간' },
  ];

  const SelectBox = (props) => {
    return (
      <select>
        {props.options.map((option) => (
          <option
            value={option.value}
            defaultValue={
              props.defaultValue === option.value
            }
          >
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className='flex'>
        <div className='column'>충전량</div>
        <div className='form-check form-check-inline'>
          <input
            className='form-check-input'
            type='radio'
            name='inlineRadioOptions'
            id='inlineRadio1'
            value='option1'
            checked={selectedOption === 'option1'}
            onChange={handlerRadioChange}
            disabled
          />
          <label className='check-label'>급속</label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            className='form-check-input'
            type='radio'
            name='inlineRadioOptions'
            id='inlineRadio2'
            value='option2'
            checked={selectedOption === 'option2'}
            onChange={handlerRadioChange}
            disabled
          />
          <label className='check-label'>완속</label>
        </div>
      </div>

      <div className='flex'>
        <div className='column'>충전시간</div>
        {selectedOption === 'option1' && (
          <SelectBox options={FAST} defaultValue='10' />
        )}
        {selectedOption === 'option2' && (
          <SelectBox options={SLOW} defaultValue='1' />
        )}
      </div>
    </>
  );
};

export default SpeedSelect;
