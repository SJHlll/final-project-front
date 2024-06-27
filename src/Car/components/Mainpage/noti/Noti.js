import React, { useState } from 'react';
import './Noti.scss';
import Notilist from './Notilist';
import Frame from '../Frame';

const Noti = () => {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };
  return (
    <>
      {/* <Button
        variant='primary'
        onClick={() => setShow(true)}
      >
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi?
            Debitis amet quae unde commodi aspernatur enim,
            consectetur. Cumque deleniti temporibus ipsam
            atque a dolores quisquam quisquam adipisci
            possimus laboriosam. Quibusdam facilis doloribus
            debitis! Sit quasi quod accusamus eos quod. Ab
            quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet
            atque facilis ipsum deleniti rem!
          </p>
        </Modal.Body>
      </Modal> */}

      <Frame>
        <div className='notiline'>
          <Notilist />

          <button
            className='createnotilist'
            onClick={handleShow}
          >
            등록
          </button>
        </div>
      </Frame>
    </>
  );
};

export default Noti;
