import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import { Divider, Form } from "antd";
import { useRouter } from "next/router";
import DynamicField from "./components/DynamicField/DynamicFieldInput";
import DynamicFieldResult from "./components/DynamicField/DynamicFieldResult";
import styles from "./styles.module.scss";

export default function RewardForm({ data, alertMessage, isPreview }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const handleFinish = () => {
    const url = PATHS.rewardConfirm.replace(/\[id\]/, id);
    router.push(url);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      className={styles.formWrapper}
    >
      {alertMessage && (
        <>
          <div className={styles.noteHeader}>入力内容確認</div>
          <Divider />
        </>
      )}

      {!isPreview ? (
        <DynamicField fields={data} />
      ) : (
        <DynamicFieldResult fields={data} />
      )}
      <div className={`${styles.noteFooter} ${!isPreview && styles.light}`}>
        <span className={styles.attention}>
          <strong>注意事項</strong>
          <br />
          ※個人情報は賞品発送がある場合のみ入力のご依頼いたします。
          <br />
          ※賞品発送はラリーマスターが実施いたします。
        </span>
      </div>
      <Form.Item
        className={`${styles.formItemBtn} ${!isPreview && styles.light}`}
      >
        <CustomButton
          type="primary"
          htmlType="submit"
          className={styles.btnSubmit}
          variant="community"
        >
          送信
        </CustomButton>
        {isPreview && (
          <CustomButton
            type="primary"
            htmlType="submit"
            onClick={() => router.back()}
            className={styles.btnSaveDraft}
            variant="community"
          >
            修正する
          </CustomButton>
        )}
      </Form.Item>
    </Form>
  );
}
