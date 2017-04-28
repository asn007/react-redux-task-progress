import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware';
import { STATE_KEY } from './constants';

export default function connectLoadingBar(_ref) {
    var getTaskState = _ref.getTaskState,
        _ref$taskHandlerState = _ref.taskHandlerStateSelector,
        taskHandlerStateSelector = _ref$taskHandlerState === undefined ? 'taskHandler' : _ref$taskHandlerState;

    return function (createStore) {
        return function (rootReducer, initialState) {
            var store = applyMiddleware(createMiddleware(getTaskState))(createStore)(rootReducer, initialState);
            store[STATE_KEY] = taskHandlerStateSelector;
            return store;
        };
    };
}