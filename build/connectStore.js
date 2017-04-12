import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware';
import reducer from './reducer';
import { STATE_KEY } from './constants';

export default function connectLoadingBar(_ref) {
    var getTaskState = _ref.getTaskState;

    return function (createStore) {
        return function (rootReducer, initialState) {
            var store = applyMiddleware(createMiddleware(getTaskState))(createStore)(rootReducer, initialState);
            store[STATE_KEY] = reducer;
            return store;
        };
    };
}