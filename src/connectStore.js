import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware';
import { STATE_KEY } from './constants';

export default function connectLoadingBar({
    getTaskState,
    taskHandlerStateSelector = 'taskHandler'
}) {
  return createStore => (rootReducer, initialState) => {
    const store = applyMiddleware(
            createMiddleware(getTaskState)
        )(createStore)(rootReducer, initialState);
    store[STATE_KEY] = taskHandlerStateSelector;
    return store;
  };
}
