import { IToDoTask } from "../task/task.model";

export interface ITaskProps {
    task: IToDoTask;
    onDragStart: (id: number) => void;
    onDragEnd: () => void;
    bg: string;
    deleteTask: Function;
    updateTask: Function;
  }
  
export interface ITaskListProps {
    state: number;
    tasks: IToDoTask[];
    bg: string;
    onDrop: (task: IToDoTask, state: number) => void;
    onDragStart: (id: number) => void;
    onDragEnd: () => void;
    deleteTask: Function;
    updateTask: Function;
  }
  
export interface IToDosProps {
    tasks: IToDoTask[];
    deleteTask: Function;
    updateTask: Function;
  }