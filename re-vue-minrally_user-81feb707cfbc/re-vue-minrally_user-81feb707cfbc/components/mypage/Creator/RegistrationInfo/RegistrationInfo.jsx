/* eslint-disable import/no-unresolved */
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import HeaderBack from "@components/common/header/HeaderBack";
import { postApplication } from "@components/mypage/service";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { JOBS, MESSAGE_DURATION, STATUS_RESPONSE } from "@utils/constants";
import { goToView } from "@utils/go-to-view";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_MAIL, REGEX_URL } from "@utils/validate";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  DatePicker
} from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { MESSAGES } from "@config/messages";
import { FORMATTER } from "@config/constants";
import moment from "moment";
import { useAuth } from "@contexts/auth";
import "moment/locale/ja";
import locale from "antd/lib/date-picker/locale/ja_JP";

import styles from "./styles.module.scss";

const ROW_INPUT_DESC = 8;

const RegistrationInfo = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState(JOBS);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const auth = useAuth();

  const onNameChange = event => {
    setName(event.target.value);
  };

  const addItem = e => {
    if (name) {
      const id = items?.length + 2;
      e.preventDefault();
      setItems([...items, { id, name: name || "その他" }]);
      form.setFieldsValue({ job: name || "その他" });
      setName("");
      setOpen(!open);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleDropdownRender = menu => {
    return (
      <div className={styles.dropdownRender}>
        {menu}
        <Divider className={styles.divider} />
        <Space className={styles.space}>
          <Input
            placeholder="その他"
            ref={inputRef}
            value={name}
            onChange={onNameChange}
          />
          <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
            追加
          </Button>
        </Space>
      </div>
    );
  };

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  const onFinish = values => {
    showLoadingAnim();
    const url = values?.refer_urls.map(el => el.name).filter(el => el);
    const data = {
      email: values.email,
      first_name: values?.first_name.trim(),
      introduction: values?.introduction.trim(),
      last_name: values?.last_name.trim(),
      job: values?.job,
      refer_urls: url,
      sex: values?.sex,
      // birthday: `${values?.year}-${values?.month}-${values?.day}`
      birthday: moment(values?.birthday).format("YYYY-MM-DD")
    };

    postApplication(data)
      .then(res => {
        if (res && res.status === STATUS_RESPONSE.success)
          message.success({
            content: MESSAGES.applyMasterSuccess,
            duration: MESSAGE_DURATION
          });
        router.push(`${PATHS.mypageCreator}/${PATHS.createAppConfirm}`);
      })
      .catch(error => message.error(error?.message))
      .finally(hideLoadingAnim());
  };

  useEffect(() => {
    form.setFieldsValue({
      refer_urls: [{ name: "" }]
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      email: auth?.user?.email
    });
  }, [auth]);

  const onFinishFailed = error => {
    const id = `form-info_${error?.errorFields[0]?.name[0]}`;
    goToView(id);
  };

  return (
    <>
      <HeaderBack title="ラリーマスター申請" />
      <div className={styles.formContainer}>
        <Form
          form={form}
          name="form-info"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
          labelAlign="left"
        >
          <Row className={styles.formItem}>
            <Col span={24} className={styles.field}>
              氏名 <span className={styles.required}>必須</span>
            </Col>
            <Col span={24} className={styles.value}>
              <Row>
                <Col span={9}>
                  <Form.Item
                    name="first_name"
                    rules={[
                      { required: true, message: ERROR_MESSAGES.empty },
                      {
                        max: 50,
                        message: ERROR_MESSAGES.maxLength.replace(/:count/, 50)
                      }
                    ]}
                    colon={false}
                    className={styles.formItem}
                  >
                    <Input
                      placeholder="苗字"
                      onBlur={e =>
                        form.setFieldsValue({
                          full_name: e.target.value.trim()
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={9} offset={1}>
                  <Form.Item
                    name="last_name"
                    rules={[
                      { required: true, message: ERROR_MESSAGES.empty },
                      {
                        max: 50,
                        message: ERROR_MESSAGES.maxLength.replace(/:count/, 50)
                      }
                    ]}
                    colon={false}
                    className={styles.formItem}
                  >
                    <Input
                      placeholder="名前"
                      onBlur={e =>
                        form.setFieldsValue({
                          full_name: e.target.value.trim()
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item
            name="birthday"
            label="生年月日"
            colon={false}
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
            className={styles.formItem}
            required
          >
            <DatePicker
              placeholder="YYYY年MM月DD日"
              format={FORMATTER.nihonDate}
              defaultPickerValue={
                auth?.user?.year_of_birth
                  ? moment(`${auth?.user?.year_of_birth}-01-01`)
                  : null
              }
              locale={locale}
            />
          </Form.Item>

          <Form.Item
            name="sex"
            label="性別"
            colon={false}
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
            className={styles.formItem}
          >
            <Radio.Group className={styles.radioGroup}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
              <Radio value={2}>その他</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="job"
            label="職業"
            colon={false}
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
            className={styles.formItem}
          >
            <Select
              placeholder="選択してください"
              dropdownRender={handleDropdownRender}
              open={open}
              onDropdownVisibleChange={visible => setOpen(visible)}
            >
              {items.map(item => (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="メールアドレス"
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              {
                max: 254,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 254)
              },
              {
                pattern: REGEX_MAIL,
                message: ERROR_MESSAGES.invalid
              }
            ]}
            colon={false}
            className={styles.formItem}
            validateFirst
          >
            <Input
              onBlur={e =>
                form.setFieldsValue({ email: e.target.value.trim() })
              }
            />
          </Form.Item>
          <div className={styles.label}>
            自己PRと作りたいラリー内容{" "}
            <span className={styles.required}>必須</span>
          </div>
          <Form.Item
            name="introduction"
            colon={false}
            wrapperCol={24}
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
            className={styles.formArea}
          >
            <Input.TextArea
              placeholder="ラリーマスター選考のため、自己PRと作りたいラリーの企画内容などをご記入ください。"
              rows={ROW_INPUT_DESC}
            />
          </Form.Item>

          <Form.List name="refer_urls">
            {(fields, { add, remove }) => (
              <div>
                <div className={styles.label}>参考URL</div>
                {fields.map(field => (
                  <Form.Item
                    className={`${styles.formItem} ${styles.mb20}`}
                    name={[field.name, "name"]}
                    key={field.name}
                    rules={[
                      {
                        pattern: REGEX_URL,
                        message: ERROR_MESSAGES.invalid
                      }
                    ]}
                  >
                    <Row className={styles.rowItemInput}>
                      <Col span={22}>
                        <Input placeholder="自己PRや企画に関するURL" />
                      </Col>
                      <Col offset={1} span={1}>
                        {field?.fieldKey !== 0 && (
                          <MinusCircleOutlined
                            className={styles.removeIcon}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                ))}
                <Row onClick={() => add()} className={styles.addLink}>
                  ＋リンクを追加する
                </Row>
              </div>
            )}
          </Form.List>
          <Form.Item wrapperCol={24}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btnSubmit}
            >
              ラリーマスター申請
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default RegistrationInfo;
