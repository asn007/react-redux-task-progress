import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware';
import { STATE_KEY } from './constants';

export default function connectLoadingBar(_ref) {
  var getTaskState = _ref.getTaskState,
      _ref$taskHandlerState = _ref.taskHandlerStateSelector,
      taskHandlerStateSelector = _ref$taskHandlerState === undefined ? 'taskHandler' : _ref$taskHandlerState;

  return function (createStore) {
    return function (rootReducer, initialState) {
      var store = applyMiddleware(
      /* eslint-disable */
      function (store) {
        // this is important because we also select task state in middleware
        store[STATE_KEY] = taskHandlerStateSelector;
        return function (next) {
          return function (action) {
            return next(action);
          };
        };
      },
      /* eslint-enable */
      createMiddleware(getTaskState))(createStore)(rootReducer, initialState);
      store[STATE_KEY] = taskHandlerStateSelector;
      return store;
    };
  };
}