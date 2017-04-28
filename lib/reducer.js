import { TASK_STARTED, TASK_FINISHED, RESET_PROGRESS } from './constants';

var initialState = {
  complete: 0,
  running: 0
};

export default function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;
  if (action.type) {
    if (action.type === TASK_STARTED) newState = { complete: state.complete + 1, running: state.running + 1 };else if (action.type === TASK_FINISHED) {
      newState = { complete: state.complete + 1, running: state.running - 1 };
      if (newState.running === 0 && newState.complete !== 0) newState = initialState;
    } else if (action.type === RESET_PROGRESS) newState = initialState;
  }
  return newState;
}