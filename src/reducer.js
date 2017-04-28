import { TASK_STARTED, TASK_FINISHED, TASK_FAKE_STARTED, TASK_FAKE_FINISHED, RESET_PROGRESS } from './constants'

const initialState = {
  complete: 0,
  running: 0,
  fakeRunning: 0,
  fakeComplete: 0
};

/* eslint-disable */
export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);

  switch(action.type) {
    case TASK_STARTED: {
      newState.running++;
      break;
    }
    case TASK_FINISHED: {
      newState.complete++;
      newState.running--;
      break;
    }
    case TASK_FAKE_STARTED: {
      newState.fakeRunning++;
      break;
    }
    case TASK_FAKE_FINISHED: {
      newState.fakeComplete++;
      newState.fakeRunning--;
      break;
    }
    case RESET_PROGRESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
  return newState;
}
/* eslint-enable */
