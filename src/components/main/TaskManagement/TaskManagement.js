import React from 'react';
import { useHistory } from 'react-router-dom';
import Task from './Task';
import { TaskManageContainer } from './styles';
import { MONTHS_IN_YEAR } from '../../../utils/constants';

const DAYS_IN_WEEK = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

const setUpWeekView = () => {
  const datesInWeek = new Array(DAYS_IN_WEEK.length);
  const now = new Date('2020', '8', '3'); // FIXME: use as a test: new Date('2020', '8', '3')
  console.log('now', now); // TODO: remove log
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const month = MONTHS_IN_YEAR[currentMonth];
  const todayOfWeek = now.getDay();
  const today = now.getDate();
  datesInWeek[todayOfWeek] = today;

  let tomorrow = today + 1;
  let tomorrowOfWeek = todayOfWeek + 1;
  while (tomorrowOfWeek < datesInWeek.length) {
    datesInWeek[tomorrowOfWeek] = new Date(
      currentYear,
      currentMonth,
      tomorrow
    ).getDate();
    tomorrow++;
    tomorrowOfWeek++;
  }
  let yesterday = today - 1;
  let yesterdayOfWeek = todayOfWeek - 1;
  let flip = false;
  while (yesterdayOfWeek >= 0) {
    const oldDate = new Date(currentYear, currentMonth, yesterday);
    datesInWeek[yesterdayOfWeek] = oldDate.getDate();
    if (flip === false && oldDate.getMonth() !== currentMonth) {
      flip = yesterdayOfWeek;
    }
    yesterday--;
    yesterdayOfWeek--;
  }
  console.log('datesInWeek', datesInWeek); // TODO: remove log
  return { month, datesInWeek, today, flip };
};

export default function TaskManagement() {
  const { month, datesInWeek, today, flip } = setUpWeekView();
  let history = useHistory();
  return (
    <>
      <TaskManageContainer>
        <div
          style={{
            border: 'none',
            boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
            padding: '0.2rem',
            margin: '0 4rem 1rem 4rem',
            cursor: 'pointer',
          }}
          onClick={() => history.push('/calendar')}
        >
          {month}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gridRowGap: '10px',
          }}
        >
          {DAYS_IN_WEEK.map((day, i) => (
            <div
              key={day}
              style={{
                fontWeight: '400',
                color: flip !== false && i <= flip ? '#666' : 'unset',
                textShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
              }}
            >
              {day}
            </div>
          ))}
          {datesInWeek.map((day, i) => (
            <div
              key={day}
              style={{
                color: flip !== false && i <= flip ? '#666' : 'unset',
                borderRadius: '20px',
                textShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
              }}
            >
              {day === today ? (
                <div
                  style={{
                    backgroundColor: '#FFA865',
                    width: '1.2rem',
                    height: '1.2rem',
                    display: 'inline-grid',
                    borderRadius: '50%',
                    border: '2px solid #FFA865',
                    boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {day}
                </div>
              ) : (
                day
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'initial' }}>
          <p>All Day</p>
          <Task color="#6AA4BC" text="Talk to 3 people in UX Facebook Group" />
          <p>Morning</p>
          <Task color="#B180BB" text="Complete Online UX Course Chapter 5" />
          <Task color="#AEDFD6" text="Do Day 15 UI Challenge" />
          <p>Afternoon</p>
          <Task color="#AEDFD6" text="Practice wireframing" />
          <p>Evening</p>
          <Task color="#FFA865" text="Learn how to conduct user interviews" />
          <Task color="#FFA865" text="Watch video on research methods" />
        </div>
      </TaskManageContainer>
      <div
        style={{
          backgroundColor: '#facb99',
          height: '3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <div onClick={() => history.push('/task-management')}>list</div>
        <div onClick={() => history.push('/createtask')}>plus</div>
        <div>user</div>
      </div>
    </>
  );
}
