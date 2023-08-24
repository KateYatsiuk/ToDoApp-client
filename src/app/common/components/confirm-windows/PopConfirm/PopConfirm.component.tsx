import "./PopConfirm.styles.scss";

import React from "react";
import { Button } from "antd";
import { message } from "antd";
import { PopoverContentProps } from "../../../../../models/modals/modals.model";
import { deleteTask } from "../../../../api/taskService";

const PopoverContent: React.FC<PopoverContentProps> = ({ taskId, deleteTask: displayDeleted, onCancel }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      displayDeleted(taskId);
      message.success("Task deleted successfully");
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };
  
  return (
      <div className="popover-content">
        <p>Are you sure you want to delete this task?</p>
        <div className="button-container">
          <Button size="small" danger onClick={handleDelete}>
            Yes
          </Button>
          <Button size="small" onClick={onCancel}>
            No
          </Button>
        </div>
      </div>
  );
};

export default PopoverContent;

