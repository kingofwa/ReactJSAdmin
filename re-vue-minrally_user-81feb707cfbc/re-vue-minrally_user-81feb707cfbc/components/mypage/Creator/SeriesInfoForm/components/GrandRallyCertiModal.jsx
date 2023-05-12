import Certificate from "@components/common/Certificate";
import CertificateModal from "@components/common/Certificate/CertificateModal";
import { DEFAULT_TEMPLATE_CERTIFICATE } from "@utils/constants";
import { Form } from "antd";
import { useEffect } from "react";

const GrandRallyCertiModal = ({
  visible,
  closeModal,
  onFinish,
  initCertificateSeri,
  seriesData
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initCertificateSeri?.id) {
      form.setFieldsValue(initCertificateSeri);
    } else
      form.setFieldsValue({
        name: DEFAULT_TEMPLATE_CERTIFICATE.name,
        description: DEFAULT_TEMPLATE_CERTIFICATE.description
      });
  }, [initCertificateSeri]);

  return (
    <CertificateModal visible={visible} closeModal={closeModal}>
      <Certificate
        form={form}
        onFinish={onFinish}
        rallyName={seriesData?.name || "グランドラリー名"}
      />
    </CertificateModal>
  );
};

export default GrandRallyCertiModal;
