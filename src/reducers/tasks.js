import { TASKS_SET, TASKS_ADD } from '../actions';

const initialState = {};

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_SET:
    case TASKS_ADD: {
      return {
        ...state,
        ...action.tasks,
      };
    }
    default:
      return state;
  }
}

export default tasksReducer;
