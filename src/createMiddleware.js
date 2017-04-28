import {
  TASK_STARTED, TASK_FAKE_STARTED, TASK_FINISHED, TASK_FAKE_FINISHED, NOT_A_TASK, STATE_KEY, RESET_PROGRESS
} from './constants';

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
  return store => next => (action) => {
    const { dispatch, getState } = store;
    const taskState = getTaskState(action);

    if(taskState !== NOT_A_TASK) {
      dispatch({ type: taskState });
      if(taskState === TASK_STARTED) {
        dispatch({ type: TASK_FAKE_STARTED });
        setTimeout(() => {
          dispatch({ type: TASK_FAKE_FINISHED });
        }, Math.floor(Math.random() * (100 - 300)) + 100);
      } else if(taskState === TASK_FINISHED) {
        const state = getState();
        const partialState = state[store[STATE_KEY]];
        if(partialState.running === 0 && partialState.fakeRunning === 0)
          setTimeout(() => dispatch({ type: RESET_PROGRESS }), 500);
      }
    }
    return next(action);
  };
}

