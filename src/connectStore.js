import { applyMiddleware } from 'redux';
import createMiddleware from './createMiddleware'
import reducer from './reducer'
import { STATE_KEY } from './constants'

export default function connectLoadingBar({
    getTaskState
}) {
    return createStore => (reducer, initialState) => {
        const store = applyMiddleware(
            createMiddleware(getTaskState)
        )(createStore)(reducer, initialState);
        store[STATE_KEY] = reducer;
        return store;
    }
}