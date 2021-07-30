import React, {ChangeEvent, FC} from 'react';
import { useState } from 'react';
import './App.css';
import {ITask} from "./Interfaces";
import TodoTask from "./components/TodoTask"

const App:FC = () => {

  const [task,setTask]=useState<string>("");
  const [deadline,setDeadline]=useState<number>(0);
  const [todoList,setTodoList]=useState<ITask[]>([]);

  const handleChange=(event: ChangeEvent<HTMLInputElement>): void =>{
    if(event.target.name==="task"){
      setTask(event.target.value)
    } else {
      setDeadline(Number(event.target.value))
    }
  }

  const addTask=(): void =>{
    const newTask={taskName:task, deadline:deadline};
    setTodoList([...todoList,newTask])
    setTask("");
    setDeadline(0);
  };

  const complateTask=(taskNameToDelete:string):void=>{
    setTodoList(todoList.filter((task)=>{
      return task.taskName != taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input onChange={handleChange} value={task} type="text" name="task" placeholder="Task..." />
          <input onChange={handleChange} value={deadline} type="number" name="deadline" placeholder="Deadline (in Days)..." />
        </div>
        <button onClick={addTask} >Add Task</button>
      </div>
      
      <div className="todoList">
        {todoList.map((task: ITask, key:number)=>{
          return <TodoTask key={key} task={task} complateTask={complateTask} />
        })}
      </div>
    </div>
  )
}

export default App
