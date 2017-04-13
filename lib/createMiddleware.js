import { TASK_STARTED, TASK_FINISHED, NOT_A_TASK } from './constants';

var taskStartedRegex = /(.*)_STARTED/;
var taskFinishedRegex = /(.*)_FINISHED/;

var getTaskState = function getTaskState(action) {
    if (action.type && typeof action.type === 'string') {
        if (taskStartedRegex.match(action.type)) return TASK_STARTED;
        if (taskFinishedRegex.match(action.type)) return TASK_FINISHED;
    }
    return NOT_A_TASK;
};

export default function createMiddleware() {
    var getTaskState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getTaskState;

    return function (_ref) {
        var dispatch = _ref.dispatch,
            getState = _ref.getState;
        return function (next) {
            return function (action) {
                var taskState = getTaskState(action);
                if (taskState !== NOT_A_TASK) dispatch({ type: taskState });
                return next(action);
            };
        };
    };
}