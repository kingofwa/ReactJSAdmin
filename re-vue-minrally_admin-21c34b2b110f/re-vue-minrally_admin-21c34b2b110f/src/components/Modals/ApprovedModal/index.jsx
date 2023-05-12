import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { approvedCreator } from '@api/creator';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './styles.scss';

const ApprovedModal = ({ visible, onVisible, id, onSuccess }) => {
  const history = useHistory();

  const onApproved = async () => {
    try {
      await approvedCreator(id);
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
    onApproved();
    onVisible();
  };

  const onCancel = () => {
    onVisible();
  };

  return (
    <>
      <Modal
        className="approved-modal"
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
          <p className="modal-title">申請承認確認</p>
          <p className="modal-message">
            このユーザーのラリーマスター申請を承認します。
            <br />
            よろしいですか？
          </p>
        </div>
        <div className="actions">
          <CustomButton onClick={onVisible}>キャンセル</CustomButton>
          <CustomButton onClick={onSubmit}>承認する</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default ApprovedModal;
