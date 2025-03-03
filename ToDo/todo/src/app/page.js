'use client';

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import HelpMe from "./component/helpMe";

export default function Home() {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const helpMeButtonRef = useRef(null);

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
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const colors = ["#FF6F61", "#FFEA00", "#FFB3BA", "#A8D8EA", "#00CED1"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 10000); // Show modal after 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    helpMeButtonRef.current?.focus(); // Restore focus to "Help Me" button
  };

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

  const handleEdit = (indexOfTask, task) => {
    setEditIndex(indexOfTask);
    setEditValue(task);
  }

  const handleSaveEdit = (indexOfTask) => {
    if(editValue.trim() !== "") {
      setTasks((prevTasks) => prevTasks.map((curTask, i) => (i === indexOfTask ? editValue : curTask)));
    }
    setEditIndex(null);
  }

  return (
      <div className="m-5">
        <h1 className="bg-yellow-200 text-6xl font-extrabold border-[5px] border-black rounded-3xl text-center">
          To Do
        </h1>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/*1st Box*/}
          <div>
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
                    {editIndex === indexOfTask ? (
                      <input 
                      type="text" 
                      className="bg-transparent max-w-full"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveEdit(indexOfTask)}
                      autoFocus
                      />) : 
                    <label>
                      <input type="checkbox" onClick={() => handleTaskComplete(indexOfTask)} />
                      {task}
                    </label>
                    }
                  </div>
                  <div className="flex no-wrap gap-1">
                    <button
                      className="bg-transparent text-white py-1 rounded min-w-max"
                      onClick={() => handleEdit(indexOfTask, task)}
                    >
                      <img className="w-[50px] h-[50px]" src="/edit-text.png" alt="Edit" />
                    </button>
                    <button
                      className="ml-1 bg-transparent text-white px-2 py-1 rounded min-w-max"
                      onClick={() => deleteTask(indexOfTask)}
                    >
                      <img className="w-[50px] h-[50px]" src="/delete.png" alt="Delete" />
                    </button>
                  </div>
                </div>
              ))) : (
                <div className="text-center text-xl p-4">No tasks added</div>
              )}
            </div>
          </div>

        {/* Completed Task Section */}
          <div>
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
        </div>
        {/*Footer*/}
        <div className="flex flex-nowrap justify-center text-xl font-semibold">
          <p>You can help me by&nbsp;<button ref={helpMeButtonRef} className="text-red-400 px-2 rounded-lg border border-dotted" onClick={openModal}>Donate</button></p>
          <p>and Follow Me&nbsp;<u><a className="text-blue-500" href="https://x.com/iamZBRais" target="_blank">ZBRais</a></u></p>
          <HelpMe isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
  );
}
