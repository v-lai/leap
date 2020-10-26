import React from 'react';
import Modal from 'react-modal';
import ReactCalendar from 'react-calendar';
import { MONTHS_IN_YEAR } from '../../../utils/constants';
import 'react-calendar/dist/Calendar.css';

Modal.setAppElement('#modal');

const modalStyles = {
  content: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    width: '100vw',
    height: '100vh',
    padding: '1.25rem',
    overflowY: 'scroll',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
};

export default function Calendar({ date, showCalendar, displayCalendar }) {
  // const now = new Date('2020', '8', '3'); // FIXME: use as a test: new Date('2020', '8', '3')
  const month = MONTHS_IN_YEAR[date.getMonth()];
  const year = date.getFullYear();

  return (
    <Modal
      isOpen={displayCalendar}
      onRequestClose={() => showCalendar(false)}
      style={modalStyles}
      contentLabel="Modal"
      className="Modal"
    >
      <p onClick={() => showCalendar(false)}>close</p>
      <p>
        {month} {year}
      </p>
      <ReactCalendar
        defaultActiveStartDate={date}
        value={date}
        calendarType="US"
      />
      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dolorem,
          facere repellendus ipsam corrupti repellat id vel adipisci veritatis ea
          eos possimus debitis fuga suscipit nisi nemo placeat nostrum vitae.
        </p>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dolorem,
          facere repellendus ipsam corrupti repellat id vel adipisci veritatis ea
          eos possimus debitis fuga suscipit nisi nemo placeat nostrum vitae.
        </p>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dolorem,
          facere repellendus ipsam corrupti repellat id vel adipisci veritatis ea
          eos possimus debitis fuga suscipit nisi nemo placeat nostrum vitae.
        </p>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dolorem,
          facere repellendus ipsam corrupti repellat id vel adipisci veritatis ea
          eos possimus debitis fuga suscipit nisi nemo placeat nostrum vitae.
        </p>
        <br />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dolorem,
          facere repellendus ipsam corrupti repellat id vel adipisci veritatis ea
          eos possimus debitis fuga suscipit nisi nemo placeat nostrum vitae.
        </p>
      </div>
    </Modal>
  );
}
