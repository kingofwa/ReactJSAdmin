import { CaretDownFilled, PlusOutlined } from "@ant-design/icons";
import { CustomButton } from "@components/common/buttons";
import { JOBS, PROVINCES, SEX } from "@utils/constants";
import { DATE_NIHON } from "@utils/date";
// import { isInOneWeek } from "@utils/helper";
import { ERROR_MESSAGES } from "@utils/message-validate";
import {
  // REGEX_DISPLAY_NAME_DEFAULT,
  REGEX_MAIL
  // REGEX_NAME_DEFAULT
} from "@utils/validate";
import { Button, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

const SettingCreator = ({ form, onFinish, handleLogout, info }) => {
  const [open, setOpen] = useState(false);

  const sexFormat = type => {
    if (type === "male") return SEX.male;
    if (type === "female") return SEX.female;
    return SEX.other;
  };

  const [items, setItems] = useState(JOBS);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = event => {
    setName(event.target.value);
  };

  const addItem = e => {
    if (name) {
      const id = items?.length + 2;
      e.preventDefault();
      setItems([...items, { id, name: name || "その他" }]);
      form.setFieldsValue({ profession: name || "その他" });
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

  return (
    <div className={styles.setting}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        name="form-info"
        className={styles.formWrapper}
        labelCol={{ span: 9 }}
        labelAlign="left"
        wrapperCol={{ span: 15 }}
      >
        <Row className={styles.rowItem}>
          <Col className={styles.title}>連携サービス</Col>
        </Row>

        <Row className={styles.rowItem}>
          <Col span={19} className={styles.value}>
            {info?.sns_name}
          </Col>
          <Col span={5}>
            <Button className={styles.btnLogout} onClick={handleLogout}>
              ログアウト
            </Button>
          </Col>
        </Row>

        {/* <Row className={styles.rowItem}>
          <Form.Item
            name="user_name"
            label="ユーザー名"
            required
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              {
                pattern: REGEX_DISPLAY_NAME_DEFAULT,
                message: ERROR_MESSAGES.invalid
              },
              {
                max: 50,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 50)
              },
              {
                min: 4,
                message: ERROR_MESSAGES.minLength.replace(/:count/, 4)
              }
            ]}
            extra={
              <div className={styles.userNameDes}>
                ユーザー名は一週間に一回のみ変更可能です。
              </div>
            }
          >
            <Input disabled={isInOneWeek(info?.user_name_updated_at)} />
          </Form.Item>
        </Row> */}

        {/* <Row className={styles.rowItem}>
          <Form.Item
            required
            name="full_name"
            label="氏名"
            rules={[
              {
                pattern: REGEX_NAME_DEFAULT,
                message: ERROR_MESSAGES.invalid
              },
              { required: true, message: ERROR_MESSAGES.empty },
              {
                max: 50,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 50)
              },
              {
                min: 2,
                message: ERROR_MESSAGES.minLength.replace(/:count/, 2)
              }
            ]}
          >
            <Input
              onBlur={e =>
                form.setFieldsValue({ full_name: e.target.value.trim() })
              }
            />
          </Form.Item>
        </Row> */}

        <Row className={styles.rowItem}>
          <Col span={24} className={styles.field}>
            氏名 <span className={styles.required}>必須</span>
          </Col>
          <Col span={24} className={styles.valueName}>
            <Row>
              <Col span={9}>
                <Form.Item
                  name="first_name"
                  rules={[
                    { required: true, message: ERROR_MESSAGES.empty },
                    // {
                    //   pattern: REGEX_NAME_NIHON,
                    //   message: ERROR_MESSAGES.invalid
                    // },
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
                    // {
                    //   pattern: REGEX_NAME_NIHON,
                    //   message: ERROR_MESSAGES.invalid
                    // },
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

        <Row className={styles.rowItem}>
          <Col className={styles.title} xs={4} sm={9}>
            生年月日
          </Col>
          <Col className={styles.value} xs={19} sm={15}>
            {info?.creator_application?.birthday
              ? moment(info?.creator_application?.birthday)
                  .tz("Asia/Tokyo")
                  .format(DATE_NIHON)
              : ""}
          </Col>
        </Row>

        <Row className={styles.rowItem}>
          <Col xs={4} sm={9} className={styles.title}>
            性別
          </Col>
          <Col xs={19} sm={15} className={styles.value}>
            {sexFormat(info?.sex)}
          </Col>
        </Row>

        <Row className={styles.rowItem}>
          <Form.Item
            name="prefecture"
            label="都道府県"
            className={styles.provider}
            required
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          >
            <Select
              suffixIcon={<CaretDownFilled className="ant-select-suffix" />}
            >
              {PROVINCES.map(item => (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Row>

        <Row className={styles.rowItem}>
          <Form.Item
            name="email"
            label="メールアドレス"
            required
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
            validateFirst
          >
            <Input
              onBlur={e =>
                form.setFieldsValue({ email: e.target.value.trim() })
              }
            />
          </Form.Item>
        </Row>

        <Row className={styles.rowItem}>
          <Form.Item
            name="profession"
            label="職業"
            className={styles.provider}
            required
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          >
            <Select
              suffixIcon={<CaretDownFilled className="ant-select-suffix" />}
              dropdownRender={handleDropdownRender}
              open={open}
              onDropdownVisibleChange={visible => setOpen(visible)}
            >
              {items?.map(item => (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Row>

        <CustomButton htmlType="submit" className={styles.saveBtn}>
          保存して戻る
        </CustomButton>
      </Form>
    </div>
  );
};

export default SettingCreator;
