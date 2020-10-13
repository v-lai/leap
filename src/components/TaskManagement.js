import React from 'react';

const DAYS_IN_WEEK = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
const MONTHS_IN_YEAR = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
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

const TaskManagement = () => {
  const { month, datesInWeek, today, flip } = setUpWeekView();
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(#aedfd6, #16425B)',
          height: 'calc(100vh - 4rem)',
        }}
      >
        <div
          style={{
            fontWeight: '400',
            border: 'none',
            margin: '1rem 33% 1rem 33%',
            padding: '0.2rem',
            boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
          }}
        >
          {month}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
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
      </div>
      <div>bottom nav here</div>
    </>
  );
};

export default TaskManagement;
