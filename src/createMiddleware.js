import { TASK_STARTED, TASK_FINISHED, NOT_A_TASK } from './constants';

const taskStartedRegex = /(.*)_STARTED/;
const taskFinishedRegex = /(.*)_FINISHED/;

const getTaskState = (action) => {
  if(action.type && typeof action.type === 'string') {
    if(taskStartedRegex.match(action.type)) return TASK_STARTED;
    if(taskFinishedRegex.match(action.type)) return TASK_FINISHED;
  }
  return NOT_A_TASK;
};

export default function createMiddleware(taskStatePredicate = getTaskState) {
  return ({ dispatch }) => next => (action) => {
    const taskState = taskStatePredicate(action);
    if(taskState !== NOT_A_TASK) dispatch({ type: taskState });
    return next(action);
  };
}
