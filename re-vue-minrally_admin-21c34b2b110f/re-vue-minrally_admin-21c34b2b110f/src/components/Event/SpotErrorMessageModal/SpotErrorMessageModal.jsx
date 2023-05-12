import React from 'react';
import { Modal } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import './styles.scss';

const SpotErrorMessageModal = ({ isShow, onHide, _onSuccess }) => {
  const onSubmit = () => {
    onHide();
  };

  const onCancel = () => {
    onHide();
  };

  return (
    <>
      <Modal
        className="message-modal"
        title="賞状の編集"
        closable={false}
        visible={isShow}
        cancelText="キャンセル"
        okText="追加"
        onOk={onSubmit}
        onCancel={onCancel}
        width="640px"
      >
        <div className="modal-body">
          <p className="modal-title">
            エラー
            <br />
            次に進むことができません
          </p>
          <p className="modal-message">
            スポットは最低3箇所の登録が必要です。
            <br /> 下書き状態のスポットがあると次に進むことができません。
          </p>
        </div>
        <div className="actions">
          <CustomButton onClick={onHide}>閉じる</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default SpotErrorMessageModal;
