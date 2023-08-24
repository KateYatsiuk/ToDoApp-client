import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddModal from './AddModal.component';
import { Task } from '../../../models/task/task.model';
import { IAddActionProps } from '../../../models/modals/modals.model';

const AddTaskAction: React.FC<IAddActionProps> = (props) => {
  const [newTask, setNewTask] = useState<Task>(new Task());
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggle = () => {
    setModalVisible((prevState) => !prevState);
    setNewTask(new Task());
  };

  const handleCancel = () => {
    toggle();
  };

  return (
  <div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', paddingRight: '1rem' }}>
      <Button type="primary" size="large" icon={<PlusCircleOutlined />} onClick={toggle}>
        New Task
      </Button>
    </div>
    <AddModal visible={modalVisible} onCancel={handleCancel} actionWithTask={props.actionWithTask} />
  </div>
  );
};

export default AddTaskAction;