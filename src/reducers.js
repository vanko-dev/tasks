import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
    FETCH_TASKS_SUCCESS, GO_TO_TASK_PAGE, SORT_TASKS,
    NEW_TASK, START_EDITING_TASK, STOP_EDITING_TASK,
    LOGIN_SUCCESS, LOGOUT
} from './actions';

import { pageCount } from "./pageUtils";


const DEFAULT_TASKS_STATE = {
    visibleTasks: [],
    totalTasksCount: 0,
    currentPageIndex: 0,
    sortField: "id",
    sortDirection: "asc",
    tasksPerPage: 3
};

const tasks = (state = DEFAULT_TASKS_STATE, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            const totalTasksCount = parseInt(action.response.message.total_task_count);
            const x = {
                ...state,
                totalTasksCount: totalTasksCount,
                currentPageIndex: Math.min(
                    pageCount(state.tasksPerPage, totalTasksCount),
                    state.currentPageIndex),
                visibleTasks: action.response.message.tasks
            };
            return x;

        case GO_TO_TASK_PAGE:
            return {
                ...state,
                currentPageIndex: action.pageIndex
            };

        case SORT_TASKS:
            return {
                ...state,
                sortField: action.sortField,
                sortDirection: action.sortDirection
            };

        default:
            return state
    }
};

const DEFAULT_AUTH_STATE = {
    token: null
};

const auth = (state = DEFAULT_AUTH_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token
            };

        case LOGOUT:
            return {
                ...state,
                token: null
            };

        default:
            return state
    }
};

export const NOT_IN_EDIT_MODE = -1;
export const NEWLY_CREATED_TASK_ID = 0;
const editableTaskId = (state = NOT_IN_EDIT_MODE, action) => {
    switch (action.type) {
        case NEW_TASK:
            return NEWLY_CREATED_TASK_ID;

        case START_EDITING_TASK:
            return state == NOT_IN_EDIT_MODE ? action.taskId : state;

        case STOP_EDITING_TASK:
            return NOT_IN_EDIT_MODE;

        case LOGOUT:
            return state == NEWLY_CREATED_TASK_ID ? state : NOT_IN_EDIT_MODE;

        default:
            return state
    }
}

export default (history) => combineReducers({
    router: connectRouter(history),
    tasks,
    auth,
    editableTaskId
});

