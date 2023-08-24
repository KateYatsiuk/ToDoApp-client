import { message } from 'antd';
import { useState } from 'react';
import { IToDoTask } from '../../../models/task/task.model';
import CustomModal from '../ReusableModal/ReusableModal.component';
import { IAddModalProps, ICreateTaskDTO } from '../../../models/modals/modals.model';
import { createTask } from '../../../app/api/taskService';

const AddModal: React.FC<IAddModalProps> = ({ visible, onCancel, actionWithTask: addTask }) => {
  const [todo, setTodo] = useState<ICreateTaskDTO>({ title: '', description: '' });

  const onAdd = async () => {
    try {
      const response = await createTask(todo);
      console.log("TODO " + todo.title + '' + todo.description);
      message.success('Task created successfully');
      addTask(response);
      onCancel();
      setTodo({ title: '', description: '' });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('Failed to create the task');
    }
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      onSave={onAdd}
      title="NEW TASK"
      initialValues={todo}
      setTodo={setTodo as React.Dispatch<React.SetStateAction<IToDoTask>>}
      isUpdate={false}
      />
  );
};

export default AddModal;
