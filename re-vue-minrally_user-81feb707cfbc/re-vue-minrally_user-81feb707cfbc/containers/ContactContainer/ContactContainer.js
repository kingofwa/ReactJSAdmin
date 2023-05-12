import { useState, useEffect } from "react";
import {
  EmailInput,
  TextAreaInput,
  TextInput,
  CustomForm,
  SelectInput
} from "@components/common/form";
import { Form, message } from "antd";
import { SubmitButton } from "@components/common/buttons";
import { getCategories, postInquiries } from "@services/contact";
import { MESSAGES } from "@config/messages";
import { MESSAGE_DURATION } from "@utils/constants";
import styles from "./ContactContainer.module.scss";

const formItemChildLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

// const contactsOptions = [
//   {
//     value: "contact",
//     label: "contact"
//   },
//   {
//     value: "contact1",
//     label: "contact1"
//   }
// ];

const ContactContainer = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const fetCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      if (response) {
        const options = response.map(({ id: value, name: label }) => ({
          value,
          label: label.toString()
        }));
        setCategoriesOptions(options);
      }
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const createInquiries = async params => {
    try {
      setLoading(true);
      await postInquiries(params);
      message.success({
        content: MESSAGES.sendSuccessfully,
        duration: MESSAGE_DURATION
      });
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetCategories();
  }, []);

  const onFinish = values => {
    createInquiries(values);
  };

  return (
    <>
      <div className={styles.contactContainer}>
        <CustomForm
          loading={loading}
          form={form}
          className="form--custom-required-mark"
          scrollToFirstError
          onFinish={onFinish}
        >
          <TextInput
            {...formItemChildLayout}
            label="氏名"
            name="name"
            required
          />
          <EmailInput
            {...formItemChildLayout}
            label="メールアドレス"
            name="email"
            required
          />
          {!loading && (
            <SelectInput
              name="category_id"
              label="お問い合わせ項目"
              data={categoriesOptions}
              placeholder="選択してください"
              required
            />
          )}
          <TextAreaInput
            {...formItemChildLayout}
            label="お問合せ内容"
            name="inquiry_content"
            required
          />
          {/* <p className={styles.description}>*のついた項目は必須項目です。</p> */}
          <div className={styles.row}>
            <SubmitButton text="送信" variant="submit" />
          </div>
        </CustomForm>
      </div>
    </>
  );
};

export default ContactContainer;
