import "./TaskList.styles.scss"

import { Empty } from "antd";
import { Task } from "../TaskItem/TaskItem.component";
import { IToDoTask } from "../../../../models/task/task.model";
import { ITaskListProps } from "../../../../models/tasks-layer/tasks-layer.model";

const TaskList: React.FC<ITaskListProps> = ({ state, tasks, bg, onDrop, onDragStart, onDragEnd, deleteTask, updateTask }) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const task = JSON.parse(e.dataTransfer.getData("task"));
      onDrop(task, state);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    return (
      <div className="task-list" onDrop={handleDrop} onDragOver={handleDragOver}>
        {tasks.length > 0 ? (
          tasks.map((task: IToDoTask) => (
            <Task
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              bg={bg}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
          ) : (
            <div className="empty-container">
              <Empty description="No tasks" />
            </div> )}
      </div>
    );
  };
  
  export { TaskList };
  