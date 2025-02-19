'use client';

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [tasks, setTasks] = useState([
    "Hitesh Sir ko Chai pilana hai",
    "Piyush sir ko lemon tea pilana hai",
    "Anirudh sir ko green tea",
    "Akash ko meri wali special chai",
    "Mukul chai peeta nahy, usko juice pila denge"
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isFirstTaskAdded, setFirst] = useState(false);
  const [completedTask, setCompletedTask] = useState([]);

  const colors = ["#FF6F61", "#FFEA00", "#FFB3BA", "#A8D8EA", "#00CED1"];

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks((prevTasks) => (isFirstTaskAdded ? [...prevTasks, inputValue] : [inputValue]));
      setInputValue("");
      
      if (!isFirstTaskAdded) {
        setCompletedTask([]); // Reset completed tasks when adding the first manual task
      }

      setFirst(true);
    }
  };

  const handleTaskComplete = (indexOfTask) => {
    setCompletedTask((prevCompleted) => [...prevCompleted, tasks[indexOfTask]]);
    deleteTask(indexOfTask);
  };

  const deleteTask = (indexOfTask) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== indexOfTask));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <>
      <div className="m-5">
        <h1 className="bg-yellow-200 text-6xl font-extrabold border-[5px] border-black rounded-3xl text-center">
          To Do
        </h1>
        <div>
          <div className="flex flex-nowrap items-center m-10 text-3xl font-sans border-black rounded-2xl">
            <input
              className="bg-slate-600 text-white border-l-[5px] border-y-[5px] border-black rounded-l-xl px-4 py-2 flex-[7] min-w-0"
              type="text"
              placeholder="Enter Task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="bg-blue-500 text-white border border-y-[5px] border-r-[5px] border-black rounded-r-xl px-4 py-2 flex-[3] min-w-max"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
          <div className="flex justify-center mx-5 mt-5 text-3xl font-bold font-sans border-black border-[5px] rounded-xl">
            Tasks List
          </div>
          <div className="mx-5 mt-2 text-3xl font-sans border-black border-[5px] rounded-xl">
            {tasks.length>0 ? (tasks.map((task, indexOfTask) => (
              <div 
                key={uuidv4()}
                className="flex justify-between items-center px-4 py-2"
                style={{ backgroundColor: colors[indexOfTask % colors.length] }}
              >
                <div className="flex no-wrap gap-2">
                  <label>
                    <input type="checkbox" onClick={() => handleTaskComplete(indexOfTask)} />
                    {task}
                  </label>
                </div>
                <button
                  className="ml-4 bg-transparent text-white px-2 py-1 rounded min-w-max"
                  onClick={() => deleteTask(indexOfTask)}
                >
                  <img className="w-[50px] h-[50px]" src="/delete.png" alt="Delete" />
                </button>
              </div>
            ))) : (
              <div className="text-center text-xl p-4">No tasks added</div>
            )}
          </div>
        </div>

        {/* Completed Task Section */}
        <div className="flex justify-center mx-5 mt-5 text-3xl font-bold font-sans border-black border-[5px] rounded-xl">
          Completed Tasks
        </div>
        <div className="mx-5 mt-2 text-3xl font-sans border-black border-[5px] rounded-xl">
          {completedTask.length > 0 ? (
            completedTask.map((taskCompleted, indexOfCompletedTask) => (
              <div 
                key={uuidv4()}
                className="flex justify-between items-center px-4 py-2"
                style={{ backgroundColor: colors[indexOfCompletedTask % colors.length] }}
              >
                <div className="flex no-wrap gap-1">
                  <label>
                    <input 
                      type="checkbox" 
                      checked 
                      readOnly 
                      onClick={() => {
                        setTasks((prevTasks) => [...prevTasks, taskCompleted]);
                        setCompletedTask((prevTasks) => prevTasks.filter((_, i) => i !== indexOfCompletedTask));
                      }} 
                    />
                    <s>{taskCompleted}</s>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl p-4">No completed tasks</div>
          )}
        </div>
      </div>

      <div className="m-5 flex justify-center text-xl font-semibold">
        Made with ❤️ by&nbsp;<a href="https://x.com/iamZBRais" target="_blank">ZBRais</a>
      </div>
    </>
  );
}
