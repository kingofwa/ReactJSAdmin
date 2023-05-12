import Certificate from "@components/common/Certificate";
import { Form, message } from "antd";
import { useEffect } from "react";
import { MESSAGES } from "@config/messages";
import { MESSAGE_DURATION } from "@utils/constants";
import CertificateModal from "../CertificateModal";

const RallyCertiModal = ({
  visible,
  closeModal,
  isOnlyView,
  setCertificate,
  certificate,
  rallyInfo
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(certificate);
  }, [certificate]);

  const onFinish = values => {
    setCertificate(values);
    closeModal();
    message.success({
      content: MESSAGES.saveSuccessfully,
      duration: MESSAGE_DURATION
    });
  };

  return (
    <CertificateModal visible={visible} closeModal={closeModal}>
      <Certificate
        form={form}
        onFinish={onFinish}
        isOnlyView={isOnlyView}
        rallyName={rallyInfo?.name}
        isShowCreatorName
      />
    </CertificateModal>
  );
};

export default RallyCertiModal;
