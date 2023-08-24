import "./ConfirmModal.styles.scss";

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

const showConfirm = (onCancel: () => void, isFormTouched: boolean, setIsFormTouched: (touched: boolean) => void) => {
  if (isFormTouched) {
  confirm({
    title: 'Cancel the operation',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure you want to cancel the operation?',
    onOk() {
      onCancel();
      setIsFormTouched(false);
    },
    onCancel() {
      console.log('Cancel');
    },
    className: 'centered-modal',
  });
} else onCancel();
};

export default showConfirm;