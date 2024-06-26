import React, { useState } from 'react';
import '../scss/PlugAndGoStation.scss';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import ReservationModal from './ReservationModal';
import '../../../scss/Button.scss';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const HoverATag = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;

const PlugAndGoStation = ({
  lat,
  lng,
  Name,
  Address,
  Speed,
  Type,
  price,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Modal Open 버튼 활성화
  const button = () => (
    <div>
      <button
        className='public-btn reserve-button'
        onClick={toggle}
      >
        예약하기
      </button>
    </div>
  );

  const closeBtn = (
    <button className='public-btn' onClick={toggle}>
      &times;
    </button>
  );

  // 예약하기 모달창 활성화
  const modalOpen = () => (
    <ModalBackground>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn} />
        <ModalBody>
          <ReservationModal
            name={Name}
            address={Address}
            speed={Speed}
            type={Type}
            price={price}
          />
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='OurStation'>
          <div className='content'>
            <div className='Name'>
              <span>
                ({Speed}) {Name}
              </span>
            </div>
          </div>
          <div className='content'>
            <div className='Address'>
              <HoverATag
                href={`https://map.kakao.com/link/to/${Address},${lat},${lng}`}
                target='_blank'
                rel='noreferrer'
              >
                {Address}
              </HoverATag>
            </div>
          </div>
          <div className='foot content'>
            <div className='ChargerType'>{Type}</div>
            <div className='Price'>{price}원</div>
            {button()}
          </div>
          {modal && modalOpen()}
        </div>
      </div>
    </div>
  );
};

export default PlugAndGoStation;
