import { TASKS_SET, TASKS_ADD } from '../actions';

const initialState = {
  tasks: {},
  dates: []
};

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_SET: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.tasks,
        },
        dates: [
          ...state.dates,
          ...action.dates
        ]
      };
    }
    case TASKS_ADD: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.tasks
        }
      };
    }
    default:
      return state;
  }
}

export default tasksReducer;
