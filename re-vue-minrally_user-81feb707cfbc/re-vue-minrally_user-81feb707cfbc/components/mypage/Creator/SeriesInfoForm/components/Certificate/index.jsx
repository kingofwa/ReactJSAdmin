/* eslint-disable import/no-unresolved */
/* eslint-disable no-irregular-whitespace */
import { CustomButton } from "@components/common/buttons";
import HeaderBack from "@components/common/header/HeaderBack";
import {
  getCertificateSeri,
  updateCertificateSeri
} from "@components/mypage/service";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import {
  DEFAULT_TEMPLATE_CERTIFICATE,
  STATUS_RESPONSE
} from "@utils/constants";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import styles from "./styles.module.scss";

const CertificateSeriTemplate = () => {
  const [form] = Form.useForm();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const router = useRouter();
  const seriId = router.query.id;

  const fetchCertificate = useCallback(() => {
    showLoadingAnim();
    if (seriId) {
      getCertificateSeri(seriId)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            form.setFieldsValue({
              name: res?.data?.name ?? DEFAULT_TEMPLATE_CERTIFICATE.name,
              description:
                res?.data?.description ??
                DEFAULT_TEMPLATE_CERTIFICATE.description
            });
          }
        })
        .finally(hideLoadingAnim());
    }
  }, [seriId]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  const onFinish = values => {
    showLoadingAnim();
    updateCertificateSeri(seriId, values)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success)
          router.push(PATHS.mypageCreatorSeriDetail.replace(/\[id\]/, seriId));
      })
      .finally(hideLoadingAnim());
  };

  return (
    <>
      <HeaderBack title="賞状の編集" />
      <div className={styles.container}>
        <div className={styles.note}>
          テキストボックスの部分のみ編集可能です。
        </div>
        <Form form={form} onFinish={onFinish} name="form-info">
          <div className={styles.content}>
            <div className={styles.certificate}>
              <Form.Item
                name="name"
                className={styles.formItemName}
                rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
              >
                <Input />
              </Form.Item>
              <Row className={styles.rallyName}>ラリー名</Row>
              <Row className={styles.playerName}>プレイヤー名 殿</Row>
              <Form.Item
                name="description"
                className={styles.formItemDesc}
                rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
              >
                <Input />
              </Form.Item>
              <Row className={styles.date}>0000年00月00日　00:00</Row>
              <Row className={styles.desc}>
                あなたは、ラリー名を制覇いたしましたことをここに表彰いた
                します。
              </Row>
              <Row className={styles.signature}>
                0000年00月00日
                <br /> ラリー名
                <br />
                クリエイター名
              </Row>
              <div className={styles.number}>No.00000</div>
            </div>
          </div>
          <Form.Item>
            <CustomButton
              className={styles.btn}
              htmlType="submit"
              variant="community"
            >
              保 存
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CertificateSeriTemplate;
