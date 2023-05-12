import { CaretDownFilled } from "@ant-design/icons";
import { CustomButton } from "@components/common/buttons";
import { PROVINCES, SEX } from "@utils/constants";
import { isInOneWeek } from "@utils/helper";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_DISPLAY_NAME_DEFAULT } from "@utils/validate";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import styles from "./style.module.scss";

const SettingPlayer = ({
  form,
  onFinish,
  handleLogout,
  info,
  isSettingPage
}) => {
  const sexFormat = type => {
    if (type === "male") return SEX.male;
    if (type === "female") return SEX.female;
    return SEX.other;
  };

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

        {!isSettingPage && (
          <Row className={styles.rowItem}>
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
          </Row>
        )}

        <Row className={styles.rowItem}>
          {info?.year_of_birth ? (
            <>
              <Col className={styles.title} xs={4} sm={9}>
                生年
              </Col>
              <Col className={styles.value} xs={19} sm={15}>
                {info?.year_of_birth}年
              </Col>
            </>
          ) : (
            <>
              <Form.Item
                name="year_of_birth"
                label="生年"
                rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
                className={styles.datePicker}
              >
                <DatePicker
                  picker="year"
                  format="YYYY"
                  placeholder="選択してください"
                  required
                  disabledDate={d =>
                    !d ||
                    d.isAfter(moment().format()) ||
                    d.isSameOrBefore("1899-12-31")
                  }
                />
              </Form.Item>
            </>
          )}
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
            className={styles.selectInput}
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
        <CustomButton htmlType="submit" className={styles.saveBtn}>
          保存して戻る
        </CustomButton>
      </Form>
    </div>
  );
};

export default SettingPlayer;
