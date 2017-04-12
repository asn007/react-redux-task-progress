import { TASK_STARTED, TASK_FINISHED } from './constants'

const initialState = {
    complete: 0,
    running: 0
};

export default function reducer(state = initialState, action) {
    if(action.type && action.type === TASK_STARTED)
        return { complete: state.complete, running: state.running + 1 };
    if(action.type && action.type === TASK_FINISHED)
        return { complete: state.complete + 1, running: state.running - 1};
    return state;
}
