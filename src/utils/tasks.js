const {
  DAYS_IN_WEEK,
  DAYS_IN_MONTHS
} = require('./constants');

export const createRepetitiveTasks = (task, timestamp) => {
  // repeating weekly
  if (task.everyRepeat === 'week') {
    if (task.repeat === '7') { // everyday
      return createTasksFromStartToEnd(task, timestamp);
    } else {
      return createWeeklyTasks(task, timestamp);
    }
  }
  // repeating monthly
  if (task.everyRepeat === 'month') {
    return createMonthlyTasks(task, timestamp);
  }
  // repeating yearly
  if (task.everyRepeat === 'year') {
    return createYearlyTasks(task, timestamp);
  }
}

// TODO: refactoring, lots of duplication
export const createTasksFromStartToEnd = (task, timestamp, addDays = 1) => {
  const tasks = {};
  let [year, month, day] = task.startDate.split('-');
  month--;
  let startDate = new Date(year, month, day);
  let [endYear, endMonth, endDay] = task.endDate.split('-');
  endMonth--;
  const endDate = new Date(endYear, endMonth, endDay);
  const totalDays = Number(((endDate - startDate) / (1000 * 60 * 60 * 24 * addDays) + 1).toFixed());
  let count = 1;
  while (startDate <= endDate) {
    year = startDate.getFullYear();
    month = startDate.getMonth();
    day = startDate.getDate();
    const dayOfWeek = DAYS_IN_WEEK[startDate.getDay()];
    const actual = `${year}-${month + 1}-${day}`;
    const timestampId = `${timestamp}_${actual}_${dayOfWeek}`;
    tasks[timestampId] = {
      ...task,
      timestamp,
      count,
      totalDays,
      actual,
      dayOfWeek,
    };
    count++;
    day = Number(day) + addDays;
    startDate = new Date(year, month, day);
    // console.log('startDate', startDate);
  }
  return tasks;
};

export const createWeeklyTasks = (task, timestamp) => {
  const tasks = {};
  let [year, month, day] = task.startDate.split('-');
  month--;
  let startDate = new Date(year, month, day);
  const originalStartDayOfTheWeek = DAYS_IN_WEEK[startDate.getDay()];
  let [endYear, endMonth, endDay] = task.endDate.split('-');
  endMonth--;
  const endDate = new Date(endYear, endMonth, endDay);
  let count = 1;
  while (startDate <= endDate) {
    year = startDate.getFullYear();
    month = startDate.getMonth();
    day = startDate.getDate();
    const dayOfWeek = DAYS_IN_WEEK[startDate.getDay()];
    const actual = `${year}-${month + 1}-${day}`;
    const timestampId = `${timestamp}_${actual}_${dayOfWeek}`;
    tasks[timestampId] = {
      ...task,
      timestamp,
      count,
      actual,
      dayOfWeek,
    };
    count++;

    // determining next day
    if (task.repeat === '1') {
      day = Number(day) + 7;
    }

    if (task.repeat === '2') {
      if (
        dayOfWeek === 'Sun' ||
        dayOfWeek === 'Mon' ||
        dayOfWeek === 'Tue' ||
        dayOfWeek === 'Wed'
      )
        day = Number(day) + 3;
      else day = Number(day) + 4;
    }

    if (task.repeat === '3') {
      if (originalStartDayOfTheWeek === 'Sun') {
        // Sun, Tu, Th
        if (dayOfWeek === 'Sun' || dayOfWeek === 'Tue') day = Number(day) + 2;
        else day = Number(day) + 3;
      } else {
        if ( // M, W, F or Tu, Th, Sat
          dayOfWeek === 'Mon' ||
          dayOfWeek === 'Tue' ||
          dayOfWeek === 'Wed' ||
          dayOfWeek === 'Thu'
        )
          day = Number(day) + 2;
        else day = Number(day) + 3;
      }
    }

    if (task.repeat === '4') {
      if (
        originalStartDayOfTheWeek === 'Mon' ||
        originalStartDayOfTheWeek === 'Thu' ||
        originalStartDayOfTheWeek === 'Fri'
      ) {
        // M, Tu, Th, F
        if (dayOfWeek === 'Mon' || dayOfWeek === 'Thu') day = Number(day) + 1;
        else if (dayOfWeek === 'Tue') day = Number(day) + 2;
        else day = Number(day) + 3;
      } else if (
        originalStartDayOfTheWeek === 'Tue' ||
        originalStartDayOfTheWeek === 'Sat'
      ) {
        // Tu, W, F, Sat
        if (dayOfWeek === 'Tue' || dayOfWeek === 'Fri') day = Number(day) + 1;
        else if (dayOfWeek === 'Wed') day = Number(day) + 2;
        else day = Number(day) + 3;
      } else {
        // W, Th, Sat, Sun
        if (dayOfWeek === 'Wed' || dayOfWeek === 'Sat') day = Number(day) + 1;
        else if (dayOfWeek === 'Thu') day = Number(day) + 2;
        else day = Number(day) + 3;
      }
    }

    if (task.repeat === '5') {
      if (
        originalStartDayOfTheWeek === 'Mon' ||
        originalStartDayOfTheWeek === 'Tue' ||
        originalStartDayOfTheWeek === 'Wed' ||
        originalStartDayOfTheWeek === 'Thu' ||
        originalStartDayOfTheWeek === 'Fri'
      ) {
        // M, Tu, W, Th, F
        if (dayOfWeek === 'Fri') day = Number(day) + 3;
        else day = Number(day) + 1;
      } else {
        // Sat, Sun, M, W, F
        if (dayOfWeek === 'Fri' ||
          dayOfWeek === 'Sat' ||
          dayOfWeek === 'Sun'
        )
          day = Number(day) + 1;
        else day = Number(day) + 2;
      }
    }

    if (task.repeat === '6') {
      if (
        originalStartDayOfTheWeek === 'Mon' ||
        originalStartDayOfTheWeek === 'Tue' ||
        originalStartDayOfTheWeek === 'Wed' ||
        originalStartDayOfTheWeek === 'Thu' ||
        originalStartDayOfTheWeek === 'Fri' ||
        originalStartDayOfTheWeek === 'Sat'
      ) {
        // M, Tu, W, Th, F, Sat
        if (dayOfWeek === 'Sat') day = Number(day) + 2;
        else day = Number(day) + 1;
      } else {
        // Sat, M, Tu, W, Th, F
        if (dayOfWeek === 'Sat') day = Number(day) + 2;
        else day = Number(day) + 1;
      }
    }

    startDate = new Date(year, month, day);
    // console.log('startDate', startDate);
  }
  // put back totalDays
  for (let taskInTasks in tasks) {
    tasks[taskInTasks] = {
      ...tasks[taskInTasks],
      totalDays: count - 1
    }
  }
  return tasks;
};

export const createMonthlyTasks = (task, timestamp) => {
  const tasks = {};
  let [year, month, day] = task.startDate.split('-');
  month--;
  let startDate = new Date(year, month, day);
  const originalDate = startDate.getDate();
  let [endYear, endMonth, endDay] = task.endDate.split('-');
  endMonth--;
  const endDate = new Date(endYear, endMonth, endDay);
  let count = 1;
  while (startDate <= endDate) {
    year = startDate.getFullYear();
    month = startDate.getMonth();
    day = startDate.getDate();
    const dayOfWeek = DAYS_IN_WEEK[startDate.getDay()];
    const actual = `${year}-${month + 1}-${day}`;
    const timestampId = `${timestamp}_${actual}_${dayOfWeek}`;
    tasks[timestampId] = {
      ...task,
      timestamp,
      count,
      actual,
      dayOfWeek,
    };
    count++;

    // determining next day
    if (task.repeat === '1') {
      month++;
      if (originalDate > 28) {
        if (DAYS_IN_MONTHS[month] >= originalDate) {
          day = originalDate;
        } else {
          day = 1;
        }
      }
    }

    if (task.repeat === '2') day += 14;

    if (task.repeat === '3') day += 9;

    if (task.repeat === '4') day += 7;

    if (task.repeat === '5') day += 6;

    if (task.repeat === '6') day += 5;

    if (task.repeat === '7') day += 4;

    startDate = new Date(year, month, day);
    // console.log('startDate', startDate);
  }
  // put back totalDays
  for (let taskInTasks in tasks) {
    tasks[taskInTasks] = {
      ...tasks[taskInTasks],
      totalDays: count - 1
    }
  }
  return tasks;
};

export const createYearlyTasks = (task, timestamp) => {
  const tasks = {};
  let [year, month, day] = task.startDate.split('-');
  month--;
  let startDate = new Date(year, month, day);
  const originalDate = startDate.getDate();
  let [endYear, endMonth, endDay] = task.endDate.split('-');
  endMonth--;
  const endDate = new Date(endYear, endMonth, endDay);
  let count = 1;
  while (startDate <= endDate) {
    year = startDate.getFullYear();
    month = startDate.getMonth();
    day = startDate.getDate();
    const dayOfWeek = DAYS_IN_WEEK[startDate.getDay()];
    const actual = `${year}-${month + 1}-${day}`;
    const timestampId = `${timestamp}_${actual}_${dayOfWeek}`;
    tasks[timestampId] = {
      ...task,
      timestamp,
      count,
      actual,
      dayOfWeek,
    };
    count++;

    // determining next day
    if (task.repeat === '1') {
      year++;
    }

    if (task.repeat === '2') {
      day = originalDate;
      month += 6;
    }

    if (task.repeat === '3') {
      day = originalDate;
      month += 4;
    }

    if (task.repeat === '4') {
      day = originalDate;
      month += 3;
    }

    if (task.repeat === '5') {
      day += 72;
    }

    if (task.repeat === '6') {
      day = originalDate;
      month += 2;
    }

    if (task.repeat === '7') {
      day += 50;
    }

    startDate = new Date(year, month, day);
    // console.log('startDate', startDate);
  }
  // put back totalDays
  for (let taskInTasks in tasks) {
    tasks[taskInTasks] = {
      ...tasks[taskInTasks],
      totalDays: count - 1
    }
  }
  return tasks;
};
