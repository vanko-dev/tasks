import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasksSuccess, stopEditingTask } from "../actions";
import { NEWLY_CREATED_TASK_ID } from "../reducers";
import { createTask, getTasks, editTask, STATUS_OK } from "../taskRepository";
import { userFriendlyError } from "../errorUtils";

const makeStatus = (done, editedByAdmin) => (done ? 10 : 0) + (editedByAdmin ? 1 : 0);

export function Task() {
    const dispatch = useDispatch();

    const editableTaskId = useSelector(state => state.editableTaskId);
    const auth = useSelector(state => state.auth);

    const isNewTask = NEWLY_CREATED_TASK_ID === editableTaskId;
    const task = !isNewTask && useSelector(state => state.tasks.visibleTasks.find(it => it.id === editableTaskId));

    const [name, setName] = useState(task && task.username || "");
    const [email, setEmail] = useState(task && task.email || "");
    const [text, setText] = useState(task && task.text || "");
    const [done, setDone] = useState(task && task.done || false);
    const [error, setError] = useState(null);

    const saveHandler = async () => {
        const saveResponse = isNewTask
            ? await createTask(name, email, text)
            : await editTask(
                auth.token,
                editableTaskId,
                text,
                makeStatus(done, task.editedByAdmin || task.text !== text));

        if (saveResponse.status == STATUS_OK) {
            dispatch(fetchTasksSuccess(await getTasks()));
            dispatch(stopEditingTask());
        } else if (saveResponse.message.token) {
            setError("Auth failed. Please log in.");
        } else {
            setError(userFriendlyError(saveResponse.message));
        }
    };

    return (
        <div className="section task">
            <div>
                <label>Username</label>
                <input value={name} onChange={e => setName(e.target.value)} disabled={!isNewTask} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!isNewTask} />
            </div>
            <div>
                <label>Text</label>
                <input value={text} onChange={e => setText(e.target.value)} />
            </div>
            {
                !isNewTask &&
                <div>
                    <label htmlFor="done">Done</label>
                    <input id="done" type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
                </div>
            }
            {error && <div className="error">{error}</div>}
            <div>
                <button onClick={() => dispatch(stopEditingTask())}>Cancel</button>
                <button onClick={saveHandler}>Save</button>
            </div>
        </div>
    );
}
