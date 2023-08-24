import "./MainTasks.styles.scss";

import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import AddTaskAction from '../modal-windows/AddModal/AddNew.component';
import TaskBoard from './tasks-components/TaskBoard/TaskBoard.component';
import { IToDoTask } from '../../models/task/task.model';
import { getAllTasks } from '../../app/api/taskService';

const MainTasks: React.FC = () => {
  const [tasks, setTasks] = useState<IToDoTask[]>([]);

  useEffect(() => {
    getAllTasks()
    .then(tasks => {setTasks(tasks);})
      .catch(error => {
        if (error.response && error.response.status !== 404) {
          alert("An error occurred.");
        }
        console.log(error);
      });
  }, []);
  
  const addTask = (newTask: IToDoTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask: IToDoTask) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      return updatedTasks;
    });
  };
  
  return (
    <div className="wrapper">
      <AddTaskAction actionWithTask={addTask} />
      <Divider orientation="center" plain>
        <h2>TASKS LIST</h2>
      </Divider>
      <div className="mainBoard">
        <TaskBoard tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
      </div>
    </div>
  );
};

export default MainTasks;
