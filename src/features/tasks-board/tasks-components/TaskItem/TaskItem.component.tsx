import "./TaskItem.styles.scss";

import { Button, Card, Popover } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateModal from "../../../modal-windows/UpdateModal/UpdateModal.component";
import { useState } from "react";
import PopoverContent from "../../../../app/common/components/confirm-windows/PopConfirm/PopConfirm.component";
import { ITaskProps } from "../../../../models/tasks-layer/tasks-layer.model";

const Task: React.FC<ITaskProps> = ({ task, onDragStart, onDragEnd, bg, deleteTask, updateTask }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deletePopoverVisible, setDeletePopoverVisible] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    onDragStart(task.id);
  };

  const toggleModal = (): void => {
    setModalVisible((prevState: boolean) => !prevState);
  };

  const toggleDeletePopover = (): void => {
    setDeletePopoverVisible((prevState: boolean) => !prevState);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const handleDelete = (): void => {
    toggleDeletePopover();
    deleteTask(task.id);
  };

  const handleCancelPopover = (): void => {
    toggleDeletePopover();
  };

  return (
    <Card
      className="task-card"
      title={<span className="task-card-header">{task.title}</span>}
      size="small"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={toggleModal}
      style={{ borderColor: `${bg}` }}
      extra={
        <div onClick={handleModalClick}>
          <Popover
            content={<PopoverContent taskId={task.id} deleteTask={handleDelete} onCancel={handleCancelPopover} />}
            title="Delete Task"
            trigger="click"
            open={deletePopoverVisible}
            onOpenChange={toggleDeletePopover}>
            <Button danger type="link" icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()} />
          </Popover>
        </div>
      }
    >
      {task.description ?
        (<p className="description">{task.description}</p>) :
        (<p className="description light-grey">No description...</p>)}

      <div onClick={handleModalClick}>
        <UpdateModal visible={modalVisible} onCancel={toggleModal} task={task} actionWithTask={updateTask} />
      </div>
    </Card>
  );
};

export { Task };