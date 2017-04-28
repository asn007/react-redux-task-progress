import { TASK_STARTED, TASK_FAKE_STARTED, TASK_FINISHED, TASK_FAKE_FINISHED, NOT_A_TASK, STATE_KEY, RESET_PROGRESS } from './constants';

var taskStartedRegex = /(.*)_STARTED/;
var taskFinishedRegex = /(.*)_FINISHED/;

var defaultPredicate = function defaultPredicate(action) {
  if (action.type && typeof action.type === 'string') {
    if (taskStartedRegex.match(action.type)) return TASK_STARTED;
    if (taskFinishedRegex.match(action.type)) return TASK_FINISHED;
  }
  return NOT_A_TASK;
};

export default function createMiddleware() {
  var getTaskState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultPredicate;

  return function (store) {
    return function (next) {
      return function (action) {
        var dispatch = store.dispatch,
            getState = store.getState;

        var taskState = getTaskState(action);

        if (taskState !== NOT_A_TASK) {
          dispatch({ type: taskState });
          if (taskState === TASK_STARTED) {
            dispatch({ type: TASK_FAKE_STARTED });
            setTimeout(function () {
              dispatch({ type: TASK_FAKE_FINISHED });
            }, Math.floor(Math.random() * (100 - 300)) + 100);
          } else if (taskState === TASK_FINISHED) {
            var state = getState();
            var partialState = state[store[STATE_KEY]];
            if (partialState.running === 0 && partialState.fakeRunning === 0) setTimeout(function () {
              return dispatch({ type: RESET_PROGRESS });
            }, 500);
          }
        }
        return next(action);
      };
    };
  };
}