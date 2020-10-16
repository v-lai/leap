import React, { useState } from 'react';
import DatePicker from 'rmc-date-picker';
import SkillColorOptions from './SkillColorOptions';
import { Input } from '../../base/Input/Input';
import { Button } from '../../base/Button/Button';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';
import * as locale from 'rmc-date-picker/lib/locale/en_US';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import { MONTHS_IN_YEAR } from '../../../utils/constants';
import { black25, orange } from '../../../themes/theme';

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
  return `${date.getFullYear()}-${month}-${mday} ${date.getHours()}:${date.getMinutes()}`;
}

export default function CreateTask(props) {
  const [taskName, setTaskName] = useState('');
  const [displayColorSelection, showColorSelection] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [displayStartDate, showStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [displayEndDate, showEndDate] = useState(false);
  const [skillColor, setColorSelection] = useState(orange);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [repeat, setRepeating] = useState(null);
  const [everyRepeat, setEveryRepeat] = useState(null);
  let history = useHistory();

  const [startDateInfo, setStartDateInfo] = useState(new Date());
  const [endDateInfo, setEndDateInfo] = useState(new Date());
  // const resetAll = () => {
  //   setTaskName('');
  //   setStartDate(new Date());
  //   setEndDate(new Date());
  //   setColorSelection('#FFA865');
  //   setTimeOfDay(null);
  //   setTaskType(null);
  //   setRepeating(null);
  //   setEveryRepeat(null);
  // };

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
          paddingBottom: '1rem'
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
            height: '1.563rem',
            width: '1.563rem',
            MozBorderRadius: '50%',
            WebkitBorderRadius: '50%',
            borderRadius: '50%',
            KhtmlBorderRadius: '50%',
            border: 'none',
            boxShadow: `0 4px 4px 0 ${black25}`,
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
        <div onClick={() => showStartDate(true)}>start date</div>
        {displayStartDate && (
          <DatePicker
            rootNativeProps={{ 'data-xx': 'yy' }}
            defaultDate={startDateInfo}
            mode="date"
            locale={locale}
            maxDate={new Date(2024, 11, 31)}
            minDate={new Date(2020, 0, 1)}
            onDateChange={(date) => {
              format(date);
              console.log('date change', format(date), date);
            }}
            onValueChange={(values, index) =>
              console.log('value change', values, index)
            }
            onScrollChange={(values, index) =>
              console.log('scroll change', values, index)
            }
            use12Hours
            formatMonth={(month) => MONTHS_IN_YEAR[month]}
          />
        )}
      </div>
      <div>
        <label htmlFor="end-date" style={{ marginRight: '1.4rem' }}>
          End Date
        </label>
        <div onClick={() => showEndDate(true)}>end date</div>
        {displayEndDate && <div onClick={() => showEndDate(false)}>close</div>}
        {displayEndDate && (
          <DatePicker
            rootNativeProps={{ 'data-xx': 'yy' }}
            defaultDate={endDateInfo}
            mode="date"
            locale={locale}
            maxDate={new Date(2024, 11, 31)}
            minDate={new Date(2020, 0, 1)}
            onDateChange={(date) => {
              format(date);
              console.log('date change', date);
            }}
            onValueChange={(values, index) =>
              console.log('value change', values, index)
            }
            onScrollChange={(values, index) =>
              console.log('scroll change', values, index)
            }
            use12Hours
            formatMonth={(month) => MONTHS_IN_YEAR[month]}
          />
        )}
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
          onClick={() => history.push('/task-management')}
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
}
