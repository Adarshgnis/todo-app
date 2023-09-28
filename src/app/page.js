"use client";
import React, { useState } from "react";

const Page = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const addTask = () => {
    if (task) {
      if (editingIndex === -1) {
        setTaskList([...taskList, task]);
      } else {
        const updatedTasks = [...taskList];
        updatedTasks[editingIndex] = task;
        setTaskList(updatedTasks);
        setEditingIndex(-1);
      }
      setTask("");
    }
  };

  const markAsComplete = (index) => {
    const completedTask = taskList[index];
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    setCompletedTasks([completedTask, ...completedTasks]);
  };

  const editTask = (index) => {
    setTask(taskList[index]);
    setEditingIndex(index);
  };

  const resetTasks = () => {
    setTaskList([]);
    setCompletedTasks([]);
  };

  return (
    <div>
      <header className="flex items-center justify-center gap-72">
        <h1 className="bg-black text-white p-5 text-2xl font-bold text-center">
          My To-Do List
        </h1>
        <button
          onClick={resetTasks}
          className="  bg-red-500 text-white px-4 py-2 rounded font-bold"
        >
          Reset
        </button>
      </header>
      <div className="p-8 bg-slate-300">
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-zinc-800 border-2 m-8 px-4 py-2 text-black"
            placeholder="Enter Task here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button
            className="bg-black text-white px-4 py-2 m-5 font-bold rounded border h-full"
            onClick={addTask}
          >
            {editingIndex === -1 ? "Add Task" : "Update Task"}
          </button>
        </div>
        <ul>
          {taskList.map((item, index) => (
            <li
              key={index}
              className="mb-5 mx-auto w-1/3 flex justify-between gap-10 items-center"
            >
              <div className="text-xl font-semibold text-black">{item}</div>
              <div>
                <button
                  onClick={() => markAsComplete(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded font-bold"
                >
                  Mark as Complete
                </button>
                <button
                  onClick={() => editTask(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded font-bold ml-2"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-green-700 text-lg font-semibold">
              Completed Tasks
            </h2>
            <ul>
              {completedTasks.map((item, index) => (
                <li key={index} className="mb-3 w-2/3">
                  <div className="text-xl font-light text-gray-500">{item}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
