import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
// import { pushMessage } from '@utils/main';
// import { MESSAGES } from '@config/messages';
import './styles.scss';

const ConfirmDelete = ({ visible, onVisible, onSuccess = () => {}, title }) => {
  const onSubmit = () => {
    onSuccess();
    onVisible();
    // pushMessage(MESSAGES.deleteSuccess);
  };

  const onCancel = () => {
    onVisible();
  };

  return (
    <>
      <Modal
        className="confirm-delete-modal"
        title="削除確認"
        closable={false}
        visible={visible}
        cancelText="キャンセル"
        okText="追加"
        onOk={onSubmit}
        onCancel={onCancel}
        width="640px"
      >
        <div className="modal-body">
          <p className="modal-title">削除確認</p>
          <p className="modal-message">
            {title}
            <br />
            よろしいですか？
          </p>
        </div>
        <div className="actions">
          <CustomButton onClick={onVisible}>キャンセル</CustomButton>
          <CustomButton onClick={onSubmit}>削除する</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmDelete;
