import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactCalendar from 'react-calendar';
import { connect } from 'react-redux';
import Task from './Task';
import { setTasks } from '../../../actions';
import firebaseInit from '../../../firebase';
import 'react-calendar/dist/Calendar.css';

const { firestore } = firebaseInit;

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

const getTasksOnDate = async (newDate, dates, uid, onSetTasks, onChange) => {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const actual = `${year}-${month}-${day}`;
  if (dates.includes(actual)) {
    onChange(new Date(year, month - 1, day));
    return;
  }
  // set tasks
  const userRef = firestore.collection('users').doc(uid);
  const querySnapshot = await userRef
    .collection('tasks')
    .where('actual', '==', actual)
    .get();
  const tasks = {};
  querySnapshot.forEach((doc) => {
    tasks[doc.id] = doc.data();
  });
  onSetTasks(tasks, [actual]);
  onChange(new Date(year, month - 1, day));
};

const Calendar = ({
  today,
  dates,
  tasks,
  showCalendar,
  displayCalendar,
  uid,
  onSetTasks
}) => {
  const [chosenDate, onChange] = useState(today);

  // FIXME: consider cleaning up duplicate code here and in TaskManagement or if we want to show this differently
  const setUpTasks =
    tasks &&
    Object.values(tasks).reduce(
      (acc, task) => {
        const year = chosenDate.getFullYear();
        const month = chosenDate.getMonth() + 1;
        const day = chosenDate.getDate();
        if (task.actual !== `${year}-${month}-${day}`) {
          return acc;
        }
        let timeOfDay = task.timeOfDay.split('-').join(' ');
        const casedTimeOfDay = timeOfDay[0]
          .toUpperCase()
          .concat(timeOfDay.slice(1));
        const taskComponent = (
          <Task
            key={task.timestamp}
            color={task.skillColor}
            text={task.taskName}
          />
        );
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
      },
      [[], [], [], []]
    );

  return (
    <Modal
      isOpen={displayCalendar}
      onRequestClose={() => showCalendar(false)}
      style={modalStyles}
      contentLabel="Modal"
      className="Modal"
    >
      <p onClick={() => showCalendar(false)}>close</p>
      <p>Calendar</p>
      <ReactCalendar
        defaultActiveStartDate={chosenDate}
        value={chosenDate}
        calendarType="US"
        onChange={async (newDate) =>
          await getTasksOnDate(newDate, dates, uid, onSetTasks, onChange)
        }
      />
      <div style={{ marginTop: '1rem' }}>
        <p>All Day</p>
        {setUpTasks[0].map((timeInDay) => timeInDay)}
        <p>Morning</p>
        {setUpTasks[1].map((timeInDay) => timeInDay)}
        <p>Afternoon</p>
        {setUpTasks[2].map((timeInDay) => timeInDay)}
        <p>Evening</p>
        {setUpTasks[3].map((timeInDay) => timeInDay)}
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  dates: state.allTasks.dates,
  tasks: state.allTasks.tasks,
  uid: state.session.authUser.uid
});

const mapDispatchToProps = (dispatch) => ({
  onSetTasks: (tasks, dates) => {
    dispatch(setTasks(tasks, dates));
  },
});

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps);
export default CalendarContainer(Calendar);
