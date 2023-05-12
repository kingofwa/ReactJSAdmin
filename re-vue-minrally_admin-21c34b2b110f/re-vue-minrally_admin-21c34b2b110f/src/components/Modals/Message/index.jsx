import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import './styles.scss';

const Message = ({ visible, onVisible, _onSuccess }) => {
  const onSubmit = () => {
    onVisible();
  };

  const onCancel = () => {
    onVisible();
  };

  return (
    <>
      <Modal
        className="message-modal"
        title="賞状の編集"
        closable={false}
        visible={visible}
        cancelText="キャンセル"
        okText="追加"
        onOk={onSubmit}
        onCancel={onCancel}
        width="640px"
      >
        <div className="modal-body">
          <p className="modal-title">申請却下確認</p>
          <p className="modal-message">
            このユーザーのラリーマスター申請を却下します。
            <br /> よろしいですか？
          </p>
        </div>
        <div className="actions">
          <CustomButton onClick={onVisible}>キャンセル</CustomButton>
          <CustomButton>却下する</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default Message;
