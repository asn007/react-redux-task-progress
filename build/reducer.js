import { TASK_STARTED, TASK_FINISHED } from './constants';

var initialState = {
    complete: 0,
    running: 0
};

export default function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type && action.type === TASK_STARTED) return { complete: state.complete, running: state.running + 1 };
    if (action.type && action.type === TASK_FINISHED) return { complete: state.complete + 1, running: state.running - 1 };
    return state;
}