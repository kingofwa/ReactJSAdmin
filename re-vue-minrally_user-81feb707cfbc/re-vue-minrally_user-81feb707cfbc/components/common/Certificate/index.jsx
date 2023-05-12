/* eslint-disable import/no-unresolved */
/* eslint-disable no-irregular-whitespace */
import { CustomButton } from "@components/common/buttons";
import { useAuth } from "@contexts/auth";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { Form, Input, Row } from "antd";
import styles from "./styles.module.scss";

const Certificate = ({
  form,
  onFinish,
  isOnlyView,
  rallyName = "ラリー名",
  isShowCreatorName = true
}) => {
  const auth = useAuth();

  return (
    <>
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
                rules={[
                  { required: true, message: ERROR_MESSAGES.empty },
                  {
                    max: 7,
                    message: ERROR_MESSAGES.maxLength.replace(/:count/, 7)
                  }
                ]}
              >
                <Input disabled={isOnlyView} />
              </Form.Item>
              <Row className={styles.rallyName}>{rallyName}</Row>
              <Row className={styles.playerName}>プレイヤー名 殿</Row>
              <Form.Item
                name="description"
                className={styles.formItemDesc}
                rules={[
                  { required: true, message: ERROR_MESSAGES.empty },
                  {
                    max: 10,
                    message: ERROR_MESSAGES.maxLength.replace(/:count/, 10)
                  }
                ]}
              >
                <Input disabled={isOnlyView} />
              </Form.Item>
              <Row className={styles.date}>0000年00月00日　00:00</Row>
              <Row className={styles.desc}>
                あなたは、{rallyName}
                を制覇いたしましたことをここに表彰いたします。
              </Row>
              <Row className={styles.signature}>
                0000年00月00日
                <br /> {rallyName} <br />
                {isShowCreatorName ? auth?.user?.user_name : "クリエイター名"}
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

export default Certificate;
