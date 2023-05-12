import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import './styles.scss';

const ConfirmChangeEmailModal = ({
  show,
  onHideModal = () => {},
  onSuccess = () => {}
}) => {
  const onSubmit = () => {
    onHideModal();
    onSuccess();
  };

  const onCancel = () => {
    onHideModal();
  };

  return (
    <Modal
      className="change-email-modal"
      title="削除確認"
      closable={false}
      visible={show}
      cancelText="キャンセル"
      okText="追加"
      onOk={onSubmit}
      onCancel={onCancel}
      width="640px"
    >
      <div className="modal-body">
        <p className="modal-title">警告</p>
        <p className="modal-message">
          ※この操作を行うと、ログインやお知らせの受け取りなど、アカウントで使用するメールアドレスが変更されます。
          <br />
          <br />
          ※メールアドレス変更後、本アカウントでログインしている全ての端末がログアウトされます。再度ログインするためには、ここで設定したメールアドレスを使用してください。
        </p>
        <div className="note">メールアドレス変更を行いまいか？</div>
      </div>
      <div className="actions">
        <CustomButton onClick={onHideModal}>いいえ</CustomButton>
        <CustomButton onClick={onSubmit}>はい</CustomButton>
      </div>
    </Modal>
  );
};

export default ConfirmChangeEmailModal;
