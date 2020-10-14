import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import SkillColorOptions from './SkillColorOptions';
import { Input } from '../../base/Input/Input';
import { Button } from '../../base/Button/Button';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';

const TIME_OF_DAY = ['Morning', 'Afternoon', 'Evening', 'All Day'];
const TIME_OF_DAY_MAP = {
  Morning: 'morning',
  Afternoon: 'afternoon',
  Evening: 'evening',
  'All Day': 'all-day',
};
const TASK_TYPE = ['One-Time', 'Recurring'];

export default function CreateTask (props) {
  const [taskName, setTaskName] = useState('');
  const [displayColorSelection, showColorSelection] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [skillColor, setColorSelection] = useState('#FFA865');
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [repeat, setRepeating] = useState(null);
  const [everyRepeat, setEveryRepeat] = useState(null);
  let history = useHistory();

  const resetAll = () => {
    setTaskName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setColorSelection('#FFA865');
    setTimeOfDay(null);
    setTaskType(null);
    setRepeating(null);
    setEveryRepeat(null);
  };

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
    history.push('/tasks');
  };

  return (
    <Container>
      <div>
        <label htmlFor="taskName">Task Name*</label>
        <Input
          type="text"
          id="taskName"
          name="taskName"
          style={{
            display: 'table',
            width: 'min(80vw, 400px)',
          }}
          value={taskName}
          onChange={({ target }) => setTaskName(target.value)}
          placeholder="Type task name..."
          required
        />
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <p>Skill Color</p>
        <button
          type="button"
          aria-label="selected-color"
          style={{
            display: 'table',
            marginLeft: '1rem',
            backgroundColor: skillColor,
            height: '20px',
            width: '20px',
            MozBorderRadius: '50%',
            WebkitBorderRadius: '50%',
            borderRadius: '50%',
            KhtmlBorderRadius: '50%',
            border: 'none',
          }}
          onClick={() => showColorSelection(true)}
        ></button>
      </div>
      {displayColorSelection && (
        <>
          <SkillColorOptions
            skillColor={skillColor}
            setColorSelection={setColorSelection}
            done={showColorSelection}
          />
          <br />
        </>
      )}
      <div>
        <label htmlFor="start-date" style={{ marginRight: '1rem' }}>
          Start Date
        </label>
        <DatePicker
          className="input"
          onChange={(date) => setStartDate(date)}
          value={startDate}
          calendarType="US"
        />
      </div>
      <div>
        <label htmlFor="end-date" style={{ marginRight: '1.4rem' }}>
          End Date
        </label>
        <DatePicker
          className="input"
          onChange={(date) => setEndDate(date)}
          value={endDate}
          calendarType="US"
        />
      </div>
      <div
        style={{
          fontWeight: '400',
          textAlign: 'center',
        }}
      >
        <p>I want to do this task in the</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '1.5fr',
            columnGap: '1em',
            justifyItems: 'stretch',
            paddingBottom: '1rem',
            paddingTop: '0.5rem',
          }}
        >
          {TIME_OF_DAY.map((time) => (
            <Button
              key={TIME_OF_DAY_MAP[time]}
              aria-label={TIME_OF_DAY_MAP[time]}
              type="button"
              onClick={() => setTimeOfDay(time)}
              className="button"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem',
                boxShadow:
                  time === timeOfDay
                    ? '0 2pt 4pt rgba(0, 0, 0, 0.8)'
                    : 'initial',
              }}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <p>What type of task is this?*</p>
          {TASK_TYPE.map((task) => (
            <Button
              type="button"
              className="button"
              key={task.toLowerCase()}
              aria-label={task.toLowerCase()}
              style={{
                margin: '0.4rem',
                minWidth: '60%',
                boxShadow:
                  taskType === task.toLowerCase()
                    ? '0 2pt 4pt rgba(0, 0, 0, 0.8)'
                    : 'initial',
              }}
              onClick={() => setTaskType(task.toLowerCase())}
            >
              {task}
            </Button>
          ))}
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
        }}
      >
        <Button
          type="button"
          className="button"
          aria-label="cancel"
          style={{
            backgroundColor: '#FFA865',
            minWidth: '40%',
            lineHeight: '1.5rem',
          }}
          onClick={() => resetAll()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="button"
          aria-label="save"
          style={{
            backgroundColor: '#FFA865',
            minWidth: '40%',
            lineHeight: '1.5rem',
          }}
          onClick={() => validateAndSave()}
        >
          Save
        </Button>
      </div>
    </Container>
  );
};
