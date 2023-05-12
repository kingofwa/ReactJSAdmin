import React, { useEffect } from 'react';
import { Form, Modal, Input } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { CustomForm } from '@components/form';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { ERROR_MESSAGES } from '@config/messages';
import './styles.scss';

const CertificateModal = ({
  visible,
  onVisible,
  _onSuccess,
  certificate,
  setCertificate,
  name = 'ラリー名',
  creator = 'クリエイター名'
}) => {
  const [form] = Form.useForm();
  const onSubmit = values => {
    setCertificate({ name: values?.name, description: values?.description });
    pushMessage(MESSAGES.saveSuccessfully);
    onVisible();
  };

  useEffect(() => {
    if (certificate) {
      form.setFieldsValue({
        name: certificate?.name,
        description: certificate?.description
      });
    }
    // eslint-disable-next-line
  }, [certificate]);

  return (
    <>
      <Modal
        className="certificate-modal"
        title="賞状の編集"
        closable={false}
        visible={visible}
        cancelText="キャンセル"
        okText="追加"
        width="500px"
      >
        <p className="modal-title">テキストボックスの部分のみ編集可能です。</p>
        <CustomForm
          name="certificate-info-form"
          autoComplete="off"
          className="certificate-info-form"
          onFinish={onSubmit}
          form={form}
        >
          <div className="content">
            <div className="certificate">
              <Form.Item
                name="name"
                className="formItemName"
                rules={[
                  { required: true, message: '名は必須です' },
                  {
                    max: 7,
                    message: ERROR_MESSAGES.maxLength.replace(/:count/, 7)
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <div className="rallyName">{name}</div>
              <div className="playerName">参加者名 殿</div>
              <Form.Item
                name="description"
                className="formItemDesc"
                rules={[
                  { required: true, message: '説明は必須です' },
                  {
                    max: 10,
                    message: ERROR_MESSAGES.maxLength.replace(/:count/, 10)
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <div className="date">0000年00月00日　00:00</div>
              <div className="desc">
                {`あなたは、${name}を制覇いたしましたことをここに表彰いたします。`}
              </div>
              <div className="signature">
                0000年00月00日
                <br /> {name}
                <br />
                {creator}
              </div>
              <div className="number">No.00000</div>
            </div>
          </div>
          <div className="actions">
            <CustomButton htmlType="submit">保存</CustomButton>
            <CustomButton className="btn-cancel" onClick={onVisible}>
              キャンセル
            </CustomButton>
          </div>
        </CustomForm>
      </Modal>
    </>
  );
};

export default CertificateModal;
