import React, { useState } from 'react';
import Modal from 'react-modal';
import SkillColorOptions from './SkillColorOptions';
import { Input } from '../../base/Input/Input';
import { Button } from '../../base/Button/Button';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';
import { black25, darkNavy, orange, paleSalmon } from '../../../themes/theme';

const TIME_OF_DAY = ['Morning', 'Afternoon', 'Evening', 'All Day'];
const TIME_OF_DAY_MAP = {
  Morning: 'morning',
  Afternoon: 'afternoon',
  Evening: 'evening',
  'All Day': 'all-day',
};
const TASK_TYPE = ['One-Time', 'Recurring'];

function format(date) {
  let mday = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  mday = mday < 10 ? `0${mday}` : mday;
  return `${date.getFullYear()}-${month}-${mday}`;
}

const modalStyles = {
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
};

Modal.setAppElement('#modal');

export default function CreateTask(props) {
  const today = new Date();
  const [taskName, setTaskName] = useState('');
  const [displayColorSelection, showColorSelection] = useState(false);
  const [skillColor, setColorSelection] = useState(orange);
  const [startDate, setStartDate] = useState(format(today));
  const [endDate, setEndDate] = useState(format(today));
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [repeat, setRepeating] = useState(null);
  const [everyRepeat, setEveryRepeat] = useState(null);
  let history = useHistory();

  const validateAndSave = () => {
    // validate
    if (!taskName || !taskType) {
      console.log('show a warning about missing taskName/taskType');
      return;
    }
    console.log(
      'save',
      taskName,
      skillColor,
      startDate,
      endDate,
      timeOfDay,
      taskType,
      repeat,
      everyRepeat
    );
    // set values for defaults if not required
    // save & push to next task management screen
    history.push('/task-management');
  };

  return (
    <Container>
      {displayColorSelection && (
        <Modal
          isOpen={displayColorSelection}
          onRequestClose={() => setColorSelection(false)}
          style={modalStyles}
          contentLabel="Modal"
          className="Modal"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <SkillColorOptions
              skillColor={skillColor}
              setColorSelection={setColorSelection}
              done={showColorSelection}
            />
          </div>
        </Modal>
      )}
      <div>
        <label htmlFor="taskName" className="taskName">
          Task Name*
        </label>
        <Input
          type="text"
          id="taskName"
          name="taskName"
          style={{
            display: 'table',
            width: 'min(100vw - 2.5rem, 400px)',
            marginTop: '0.5rem',
          }}
          value={taskName}
          onChange={({ target }) => setTaskName(target.value)}
          placeholder="Type task name..."
          required
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '0.5rem',
          }}
        >
          <p>Skill Color</p>
          <Button
            type="button"
            aria-label="selected-color"
            style={{
              display: 'table',
              marginLeft: '1rem',
              backgroundColor: skillColor,
              height: '1.563rem',
              width: '1.563rem',
              MozBorderRadius: '50%',
              WebkitBorderRadius: '50%',
              borderRadius: '50%',
              KhtmlBorderRadius: '50%',
              border: 'none',
              boxShadow: `0 4px 4px 0 ${black25}`,
            }}
            onClick={() => showColorSelection(!displayColorSelection)}
          ></Button>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            paddingTop: '1rem',
          }}
        >
          <label htmlFor="start-date" style={{ marginRight: '1rem' }}>
            Start Date
          </label>
          <Input
            type="date"
            id="start-date"
            name="start-date"
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </div>
        <div>
          <label htmlFor="end-date" style={{ marginRight: '1.4rem' }}>
            End Date
          </label>
          <Input
            type="date"
            id="end-date"
            name="end-date"
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </div>
      </div>
      <div>
        <p>I want to do this task...</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100%',
            justifyContent: 'center',
            paddingTop: '1rem',
          }}
        >
          <select
            id="task-time"
            className="input"
            onChange={({ target }) => setTimeOfDay(target.value)}
          >
            <option value="">--not selected--</option>
            {TIME_OF_DAY.map((time) => (
              <option key={TIME_OF_DAY_MAP[time]} value={TIME_OF_DAY_MAP[time]}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ paddingBottom: '0.5rem' }}>What type of task is this?*</p>
          <div style={{ display: 'inline-table' }}>
            {TASK_TYPE.map((task) => (
              <Button
                type="button"
                className="button"
                key={task.toLowerCase()}
                aria-label={task.toLowerCase()}
                style={{
                  margin: '0.4rem',
                  minWidth: '90%',
                  border:
                    taskType === task.toLowerCase()
                      ? `solid 0.8px ${darkNavy}`
                      : 'initial',
                }}
                onClick={() => setTaskType(task.toLowerCase())}
              >
                {task}
              </Button>
            ))}
          </div>
          {taskType === 'recurring' && (
            <div style={{ padding: '0.8rem 0.5rem' }}>
              <label htmlFor="repeat-times">Repeat </label>
              <select
                id="repeat-times"
                className="input"
                onChange={({ target }) => setRepeating(target.value)}
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
              <label htmlFor="every"> times, every </label>
              <select
                id="every"
                className="input"
                onChange={({ target }) => setEveryRepeat(target.value)}
              >
                <option value=""></option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1.5fr',
          justifyItems: 'center',
          width: 'min(100%, 600px)',
        }}
      >
        <div>
          <Button
            type="button"
            className="button"
            aria-label="cancel"
            style={{
              backgroundColor: paleSalmon,
              minWidth: '60%',
              width: '4.375rem',
              height: '1.875rem',
              borderColor: paleSalmon,
              lineHeight: '1.875',
            }}
            onClick={() => history.push('/task-management')}
          >
            Cancel
          </Button>
        </div>
        <div style={{ gridColumnStart: '2' }}>
          <Button
            type="submit"
            className="button"
            aria-label="save"
            style={{
              backgroundColor: paleSalmon,
              minWidth: '60%',
              width: '4.375rem',
              height: '1.875rem',
              borderColor: paleSalmon,
              lineHeight: '1.875',
            }}
            onClick={() => validateAndSave()}
          >
            Save
          </Button>
        </div>
      </div>
    </Container>
  );
}
