import "./TaskBoard.styles.scss";

import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { API_ENDPOINTS } from "../../../../app/common/constants/url.constants";
import httpModule from "../../../../app/common/helpers/http.module";
import { TaskList } from "../TaskList/TaskList.component";
import { IToDoTask } from "../../../../models/task/task.model";
import { IToDosProps } from "../../../../models/tasks-layer/tasks-layer.model";
import { STATES } from "../../../../app/common/constants/states.constant";

const TaskBoard: React.FC<IToDosProps> = ({ tasks, deleteTask, updateTask }) => {
  const [allTasks, setTasks] = useState<IToDoTask[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  const handleDrop = async (task: IToDoTask, newStatus: number) => {
    const updatedTasks = allTasks.map((t) =>
      t.id === task.id ? { ...t, toDoState: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      const updatedTask = updatedTasks.find((t) => t.id === task.id);
      if (updatedTask) {
        await httpModule.put(API_ENDPOINTS.PUT + `${task.id}`, updatedTask);
        console.log('Task updated successfully in the database', updatedTask);
      }
    } catch (error) {
      console.log('Error updating task in the database:', error);
    }
  };

  const handleDragStart = (id: number) => {
    setDraggedTaskId(id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <Row gutter={[16, 16]}>
      {STATES.map((stateData) => (
        <Col span={8} key={stateData.state}>
          <Card className="my-card" title={<span className="card-header">{stateData.title}</span>} bordered={true}>
            <TaskList
              state={stateData.state}
              tasks={allTasks.filter((t) => t.toDoState === stateData.state)}
              onDrop={handleDrop}
              bg={stateData.bg}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskBoard;
