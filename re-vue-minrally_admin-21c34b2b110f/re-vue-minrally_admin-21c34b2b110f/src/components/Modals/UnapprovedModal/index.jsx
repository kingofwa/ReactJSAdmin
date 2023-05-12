import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { unapprovedCreator } from '@api/creator';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './styles.scss';

const UnapprovedModal = ({ visible, onVisible, id, onSuccess }) => {
  const history = useHistory();

  const onUnapproved = async () => {
    try {
      await unapprovedCreator(id);
      if (onSuccess) {
        onSuccess();
      } else {
        history.push(PATHS.masterApplicationList);
      }
    } catch (error) {
      //
    }
  };

  const onSubmit = () => {
    onUnapproved();
    onVisible();
  };

  const onCancel = () => {
    onVisible();
  };

  return (
    <>
      <Modal
        className="unapproved-modal"
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
          <CustomButton onClick={onSubmit}>却下する</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default UnapprovedModal;
