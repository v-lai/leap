export const AUTH_USER_SET = 'AUTH_USER_SET';
export const TASKS_SET = 'TASKS_SET';
export const TASKS_ADD = 'TASKS_ADD';

export function setAuthUser(authUser) {
  return {
    type: AUTH_USER_SET,
    authUser
  };
}

export function setTasks(tasks, dates) {
  return {
    type: TASKS_SET,
    tasks,
    dates
  };
}

export function addTask(tasks) {
  return {
    type: TASKS_ADD,
    tasks
  };
}
