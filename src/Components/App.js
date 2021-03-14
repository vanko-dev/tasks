import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getTasks } from "../taskRepository";
import { fetchTasksSuccess, goToTaskPage, sortTasks, newTask } from "../actions";

import { TopBar } from "./TopBar";
import { TaskList } from "./TaskList";
import { Task } from "./Task";
import { Pagination } from "./Pagination";

import "../style.css";

export default function App() {
  const tasks = useSelector(state => state.tasks);
  const editableTaskId = useSelector(state => state.editableTaskId);
  const dispatch = useDispatch();

  const fetchTasks = async (pageIndex, sortField, sortDirection) => {
    const tasks = await getTasks(sortField, sortDirection, pageIndex)
    dispatch(fetchTasksSuccess(tasks));
  };

  useEffect(() => fetchTasks(tasks.currentPageIndex), []);

  const onPageClick = async pageIndex => {
    dispatch(goToTaskPage(pageIndex));
    fetchTasks(pageIndex, tasks.sortField, tasks.sortDirection);
  };

  const onSort = async (sortField, sortDirection) => {
    dispatch(sortTasks(sortField, sortDirection));
    fetchTasks(tasks.currentPageIndex, sortField, sortDirection);
  };

  return (
    <>
      <TopBar />
      {editableTaskId >= 0 && <Task />}
      <div className="section">
        <TaskList
          tasks={tasks.visibleTasks}
          sortField={tasks.sortField}
          sortDirection={tasks.sortDirection}
          onSort={onSort} />
        <Pagination
          itemsPerPage={tasks.tasksPerPage}
          totalItems={tasks.totalTasksCount}
          currentPageIndex={tasks.currentPageIndex}
          onPageClick={onPageClick} />
      </div>
    </>
  );
}