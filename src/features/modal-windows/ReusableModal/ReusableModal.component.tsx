import { Modal, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import showConfirm from '../../../app/common/components/confirm-windows/ConfirmModal/ConfirmModal.component';
import { IToDoTask } from '../../../models/task/task.model';
import { CustomModalProps } from '../../../models/modals/modals.model';

const CustomModal: React.FC<CustomModalProps> = ({ visible, onCancel, onSave, title, initialValues, setTodo, isUpdate }) => {
  const [form] = Form.useForm();
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [todo, setTodoState] = useState<IToDoTask>(initialValues as IToDoTask);

  useEffect(() => {
    form.validateFields();
    if (!isUpdate) {
      setTodoState({ ...initialValues } as IToDoTask);
    }
    setIsFormTouched(form.isFieldsTouched());
  }, [form, initialValues, isUpdate]);

  const handleSave = async () => {
    try {
      await form.validateFields();
      await onSave();
      if (isUpdate) {
        setTodoState(initialValues as IToDoTask);
      }
      setIsFormTouched(false);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('Failed to save the data');
    }
  };

  const handleCancel = () => {
    if (!isUpdate) {
      setTodoState({ title: '', description: '' } as IToDoTask);
    }
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleSave}
      cancelButtonProps={{ onClick: () => showConfirm(handleCancel, isFormTouched, setIsFormTouched) }}
      destroyOnClose={true}
      closable={false}
      okText="Save"
      className='modal'
    >
      <Form
        form={form}
        preserve={false}
        name="dynamic_rule"
        layout="vertical"
        onValuesChange={() => setIsFormTouched(true)}
        initialValues={todo}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input
            showCount
            maxLength={45}
            name="title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            showCount
            maxLength={100}
            name="description"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal;