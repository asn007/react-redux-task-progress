import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware';
import { STATE_KEY } from './constants';

export default function connectLoadingBar({
    getTaskState,
    taskHandlerStateSelector = 'taskHandler'
}) {
  return createStore => (rootReducer, initialState) => {
    const store = applyMiddleware(
            /* eslint-disable */
            (store) => {
              // this is important because we also select task state in middleware
              store[STATE_KEY] = taskHandlerStateSelector;
              return next => action => next(action);
            },
            /* eslint-enable */
            createMiddleware(getTaskState)
    )(createStore)(rootReducer, initialState);
    store[STATE_KEY] = taskHandlerStateSelector;
    return store;
  };
}
