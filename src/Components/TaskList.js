import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { startEditingTask } from "../actions";
import * as taskRepository from "../taskRepository";

const SortIndicator = ({ sortDirection }) =>
  <>{sortDirection == taskRepository.SORT_ASC ? <>&#129045;</> : <>&#129047;</>}</>;

const Header = ({ children, showSortIndicator, sortDirection, onSort }) =>
  <th onClick={onSort}>
    {children} {showSortIndicator ? <SortIndicator sortDirection={sortDirection} /> : <>&nbsp;&nbsp;</>}
  </th>;

const status = (done, editedByAdmin) => `${done && "done" || ""}\n${editedByAdmin && "editedByAdmin" || ""}`.trim();

const Row = ({ task }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{task.text}</td>
      <td><i>{status(task.done, task.editedByAdmin)}</i></td>
      {auth.token && <td><button onClick={() => dispatch(startEditingTask(task.id))}>Edit</button></td>}

    </tr>);
};

const reverseSortDirection = currentSortDirection =>
  currentSortDirection == taskRepository.SORT_ASC
    ? taskRepository.SORT_DESC
    : taskRepository.SORT_ASC;

export const TaskList = ({ tasks, sortField, sortDirection, onSort }) => (
  <>
    {
      tasks && tasks.length
        ? <table>
          <thead>
            <tr>
              <Header
                showSortIndicator={sortField == taskRepository.TASK_USERNAME}
                sortDirection={sortDirection}
                onSort={() => onSort(taskRepository.TASK_USERNAME, reverseSortDirection(sortDirection))}>Name</Header>
              <Header
                showSortIndicator={sortField == taskRepository.TASK_EMAIL}
                sortDirection={sortDirection}
                onSort={() => onSort(taskRepository.TASK_EMAIL, reverseSortDirection(sortDirection))}>
                Email
              </Header>
              <Header
                showSortIndicator={sortField == taskRepository.TASK_TEXT}
                sortDirection={sortDirection}
                onSort={() => onSort(taskRepository.TASK_TEXT, reverseSortDirection(sortDirection))}>
                Text
              </Header>
              <Header
                showSortIndicator={sortField == taskRepository.TASK_STATUS}
                sortDirection={sortDirection}
                onSort={() => onSort(taskRepository.TASK_STATUS, reverseSortDirection(sortDirection))}>
                Status
              </Header>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => <Row key={task.id} task={task} />)}
          </tbody>
        </table>
        : <>hey. no tasks yet</>
    }
  </>);