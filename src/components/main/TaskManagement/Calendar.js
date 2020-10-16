import React from 'react';
import ReactCalendar from 'react-calendar';
import { MONTHS_IN_YEAR } from '../../../utils/constants';

export default function Calendar() {
  const now = new Date('2020', '8', '3'); // FIXME: use as a test: new Date('2020', '8', '3')
  const month = MONTHS_IN_YEAR[now.getMonth()];
  const year = now.getFullYear();

  return (
    <div>
      <p>
        {month} {year}
      </p>
      <ReactCalendar defaultActiveStartDate={now} />
    </div>
  );
}
