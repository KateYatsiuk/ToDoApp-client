import { IToDoTask } from "../task/task.model";

export interface CustomModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: () => Promise<void>;
  title: string;
  initialValues: { title: string; description: string; };
  setTodo: React.Dispatch<React.SetStateAction<IToDoTask>>;
  isUpdate: boolean
}

export interface IAddModalProps {
    visible: boolean;
    onCancel: () => void;
    actionWithTask: Function;
}

export interface IUpdateModal {
  visible: boolean;
  onCancel: () => void;
  actionWithTask: Function;
  task: IToDoTask;
}
  
export interface IAddActionProps {
  actionWithTask: Function,
}

export interface ICreateTaskDTO {
  title: string;
  description: string;
}

export interface PopoverContentProps {
  taskId: number;
  deleteTask: (taskId: number) => void;
  onCancel: () => void;
}