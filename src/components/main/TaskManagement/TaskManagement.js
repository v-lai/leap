import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Task from './Task';
import { TaskManageContainer } from './styles';
import { MONTHS_IN_YEAR } from '../../../utils/constants';
import Calendar from './Calendar';
import { Button } from '../../base/Button/Button';

const DAYS_IN_WEEK = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

const setUpWeekView = () => {
  const datesInWeek = new Array(DAYS_IN_WEEK.length);
  const now = new Date();
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
  return { month, datesInWeek, today, flip, now };
};

const TaskManagement = ({ tasks }) => {
  const { month, datesInWeek, today, flip, now } = setUpWeekView();
  const [displayCalendar, showCalendar] = useState(false);

  let history = useHistory();

  const setUpTasks =
    tasks &&
    Object.values(tasks).reduce((acc, task) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      if (task.actual !== `${year}-${month}-${day}`) {
        return acc;
      }
      let timeOfDay = task.timeOfDay.split('-').join(' ');
      const casedTimeOfDay = timeOfDay[0].toUpperCase().concat(timeOfDay.slice(1));
      const taskComponent = <Task key={task.timestamp} color={task.skillColor} text={task.taskName} />;
      if (casedTimeOfDay === 'All day') {
        acc[0].push(taskComponent);
      }
      if (casedTimeOfDay === 'Morning') {
        acc[1].push(taskComponent);
      }
      if (casedTimeOfDay === 'Afternoon') {
        acc[2].push(taskComponent);
      }
      if (casedTimeOfDay === 'Evening') {
        acc[3].push(taskComponent);
      }
      return acc;
    }, [[], [], [], []]);

  return (
    <>
      {displayCalendar && (
        <Calendar
          today={now}
          showCalendar={showCalendar}
          displayCalendar={displayCalendar}
        />
      )}
      <TaskManageContainer>
        <Button
          style={{
            background: 'none',
            border: 'none',
            boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.2)',
            padding: '0.2rem',
            margin: '0 4rem 1rem 4rem',
            cursor: 'pointer',
            width: '10rem',
          }}
          onClick={() => showCalendar(true)}
        >
          {month}
        </Button>
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
          {setUpTasks[0].map(timeInDay => timeInDay)}
          <p>Morning</p>
          {setUpTasks[1].map(timeInDay => timeInDay)}
          <p>Afternoon</p>
          {setUpTasks[2].map(timeInDay => timeInDay)}
          <p>Evening</p>
          {setUpTasks[3].map(timeInDay => timeInDay)}
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

const mapStateToProps = (state) => ({
  tasks: state.allTasks.tasks
});

const TaskManagementReduxContainer = connect(mapStateToProps);
export default TaskManagementReduxContainer(TaskManagement);
