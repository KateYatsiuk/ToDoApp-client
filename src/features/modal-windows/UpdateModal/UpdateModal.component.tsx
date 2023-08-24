import { message } from 'antd';
import { useState } from 'react';
import { IToDoTask } from '../../../models/task/task.model';
import CustomModal from '../ReusableModal/ReusableModal.component';
import { updateTask } from '../../../app/api/taskService';
import { IUpdateModal } from '../../../models/modals/modals.model';

const UpdateModal: React.FC<IUpdateModal> = (props) => {
  const [todo, setTodo] = useState<IToDoTask>(props.task);

  const onSaveChanges = async () => {
    try {
      await updateTask(todo);
      message.success('Task updated successfully');
      setTodo(todo);
      props.actionWithTask(todo);
      props.onCancel();
    } catch (errorInfo) {
      message.error('Failed to update the task');
    }
  };

  return (
    <CustomModal
      visible={props.visible}
      onCancel={props.onCancel}
      onSave={onSaveChanges}
      title="TASK INFO"
      initialValues={todo}
      setTodo={setTodo}
      isUpdate={true}
    />
  );
};

export default UpdateModal;