export const STATUS_OK = "ok";
export const STATUS_ERROR = "error";

export const TASK_USERNAME = "username";
export const TASK_EMAIL = "email";
export const TASK_TEXT = "text";
export const TASK_STATUS = "status";

export const SORT_ASC = "asc";
export const SORT_DESC = "desc";

export const getTasks = (sortField = "id", sortDirection = "asc", pageIndex = 0) =>
    get("", {
        sort_field: sortField,
        sort_direction: sortDirection,
        page: pageIndex + 1
    }).then(response => ({
        ...response,
        message: {
            ...response.message,
            tasks: response.message.tasks.map(task => ({
                ...task,
                done: task.status >= 10,
                editedByAdmin: task.status % 10 > 0
            }))
        }
    }));

export const createTask = (userName, email, text) =>
    post("create", {
        username: userName,
        email,
        text
    });

export const editTask = (token, taskId, text, status) =>
    post(`edit/${taskId}`, {
        token,
        text,
        status
    });

export const login = (username, password) =>
    post("login", {
        username: username,
        password
    });

const BASE_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
const DEV = "ivanv";

const get = (method, params) => {
    const url = new URL(`${BASE_URL}${method}`);
    url.search = new URLSearchParams({ ...params, developer: DEV }).toString();
    return fetch(url).then(it => it.json());
};

const post = (method, params) => {
    const url = new URL(`${BASE_URL}${method}`);
    url.search = new URLSearchParams({ developer: DEV }).toString();

    const formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));

    return fetch(url,
        {
            method: 'post',
            body: formData
        })
        .then(it => it.json());
};
