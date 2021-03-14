export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const fetchTasksSuccess = response => ({
    type: FETCH_TASKS_SUCCESS,
    response
});

export const GO_TO_TASK_PAGE = "GO_TO_TASK_PAGE";
export const goToTaskPage = pageIndex => ({
    type: GO_TO_TASK_PAGE,
    pageIndex
});

export const NEW_TASK = "NEW_TASK";
export const newTask = () => ({ type: NEW_TASK });

export const START_EDITING_TASK = "START_EDITING_TASK";
export const startEditingTask = taskId => ({
    type: START_EDITING_TASK,
    taskId
});

export const STOP_EDITING_TASK = "STOP_EDITING_TASK";
export const stopEditingTask = () => ({ type: STOP_EDITING_TASK });



export const SORT_TASKS = "SORT_TASKS";
export const sortTasks = (sortField, sortDirection) => ({
    type: SORT_TASKS,
    sortField,
    sortDirection
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    token
});

export const LOGOUT = "LOGOUT";
export const logout = () => ({ type: LOGOUT });

