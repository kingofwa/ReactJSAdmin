import Certificate from "@components/common/Certificate";
import { DEFAULT_TEMPLATE_CERTIFICATE } from "@utils/constants";
import { Form } from "antd";
import { useEffect } from "react";
import CertificateModal from "../CertificateModal";

const GrandRallyCertiModal = ({ visible, closeModal, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: DEFAULT_TEMPLATE_CERTIFICATE.name,
      description: DEFAULT_TEMPLATE_CERTIFICATE.description
    });
  }, []);

  return (
    <CertificateModal visible={visible} closeModal={closeModal}>
      <Certificate form={form} onFinish={onFinish} />
    </CertificateModal>
  );
};

export default GrandRallyCertiModal;
