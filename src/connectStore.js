import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware'
import reducer from './reducer'
import { STATE_KEY } from './constants'

export default function connectLoadingBar({
    getTaskState
}) {
    return createStore => (rootReducer, initialState) => {
        const store = applyMiddleware(
            createMiddleware(getTaskState)
        )(createStore)(rootReducer, initialState);
        store[STATE_KEY] = reducer;
        return store;
    }
}
