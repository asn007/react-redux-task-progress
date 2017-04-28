import { TASK_STARTED, TASK_FAKE_STARTED, TASK_FINISHED, TASK_FAKE_FINISHED, NOT_A_TASK } from './constants';

const taskStartedRegex = /(.*)_STARTED/;
const taskFinishedRegex = /(.*)_FINISHED/;

const defaultPredicate = (action) => {
  if(action.type && typeof action.type === 'string') {
    if(taskStartedRegex.match(action.type)) return TASK_STARTED;
    if(taskFinishedRegex.match(action.type)) return TASK_FINISHED;
  }
  return NOT_A_TASK;
};

export default function createMiddleware(getTaskState = defaultPredicate) {
  return ({ dispatch }) => next => (action) => {
    const taskState = getTaskState(action);

    if(taskState !== NOT_A_TASK) {
      dispatch({ type: taskState });
      if(taskState === TASK_STARTED) {
        dispatch({ type: TASK_FAKE_STARTED });
        setTimeout(() => {
          dispatch({ type: TASK_FAKE_FINISHED });
        }, Math.floor(Math.random() * (100 - 300)) + 100);
      }
    }
    return next(action);
  };
}

