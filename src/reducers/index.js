import { combineReducers } from 'redux';
import sessionReducer from './session';
import tasksReducer from './tasks';

const rootReducer = combineReducers({
  session: sessionReducer,
  tasks: tasksReducer
});

export default rootReducer;
