import { Divider, Form } from "antd";
import { useEffect } from "react";
import BlockWrapper from "../BlockWrapper";
import styles from "./style.module.scss";

// const ROW_INPUT_DESC = 9;
// const ROW_TEXTAREA_CAMPAIGN = 5;

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9Mwcx27nANqW5LYIt-v843-_9EckRGpot4R2yrWOBomjh5Q/viewform";

const AcceptRally = ({ isTop }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      refer_urls: [{ name: "" }]
    });
  }, []);

  return (
    <section
      className={
        isTop ? `${styles.isTop} ${styles.acceptRally}` : styles.acceptRally
      }
      id="accept-rally"
    >
      <BlockWrapper isTop title="ラリーマスター受付中！">
        <Divider className={styles.divider} />

        <iframe
          className={styles.iframe}
          src={GOOGLE_FORM_URL}
          scrolling="yes"
          title="google form"
        />
        {/* <div className={styles.formContainer}>
          <Form form={form}>
            <div className={styles.form}>
              <Row className={styles.formItem}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  氏名*
                </Col>
                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Row gutter={{ lg: 30, md: 20, sm: 20, xs: 20 }}>
                    <Col lg={9} md={12} sm={12} xs={12}>
                      <Form.Item>
                        <Input placeholder="苗字" />
                      </Form.Item>
                    </Col>
                    <Col lg={9} md={12} sm={12} xs={12}>
                      <Form.Item>
                        <Input placeholder="名前" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={styles.formItem}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  生年月日*
                </Col>

                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Row>
                    <Col xs={7}>
                      <Form.Item
                        name="year"
                        colon={false}
                        rules={[
                          { required: true, message: ERROR_MESSAGES.empty },
                          {
                            pattern: REGEXP_YEAR,
                            message: ERROR_MESSAGES.invalid
                          }
                        ]}
                        className={styles.rowReverse}
                      >
                        <Input placeholder="西暦" />
                      </Form.Item>
                    </Col>
                    <Col span={2} className={styles.spanDate}>
                      年
                    </Col>
                    <Col xs={4}>
                      <Form.Item
                        name="month"
                        colon={false}
                        rules={[
                          { required: true, message: ERROR_MESSAGES.empty },
                          {
                            pattern: REGEXP_MONTH,
                            message: ERROR_MESSAGES.invalid
                          }
                        ]}
                        className={styles.rowReverse}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={2} className={styles.spanDate}>
                      月
                    </Col>

                    <Col xs={4}>
                      <Form.Item
                        name="day"
                        colon={false}
                        rules={[
                          { required: true, message: ERROR_MESSAGES.empty },
                          {
                            pattern: REGEXP_DAY,
                            message: ERROR_MESSAGES.invalid
                          }
                        ]}
                        className={styles.rowReverse}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={2} className={styles.spanDate}>
                      日
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={styles.formItem}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  性別*
                </Col>
                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Form.Item
                    name="sex"
                    colon={false}
                    rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
                  >
                    <Radio.Group className={styles.radioGroup}>
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                      <Radio value={2}>その他</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row className={styles.formItem}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  職業*
                </Col>
                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Form.Item
                    name="job"
                    colon={false}
                    rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
                  >
                    <Select
                      placeholder="選択してください"
                      suffixIcon={<CaretDownOutlined />}
                    >
                      {JOBS.map(item => (
                        <Select.Option
                          value={item.name}
                          key={`${item.id}_${item.name}`}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row className={styles.formItem}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  メールアドレス*
                </Col>
                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: ERROR_MESSAGES.empty },
                      { type: "email", message: ERROR_MESSAGES.invalidEmail }
                    ]}
                    colon={false}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={styles.formArea}>
                <Col
                  lg={7}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  自己PR*
                </Col>
                <Col
                  lg={17}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Form.Item
                    name="introduction"
                    colon={false}
                    wrapperCol={24}
                    rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
                  >
                    <Input.TextArea
                      placeholder=" どんな分野が得意か、どんなことに詳しいかなど  
                      ご自分のことをご紹介してください。"
                      rows={ROW_INPUT_DESC}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={styles.formItem}>
                <Col
                  lg={{ span: 17, offset: 7 }}
                  md={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  xs={{ span: 24, offset: 0 }}
                  className={styles.formWrapperCol}
                >
                  <Form.List name="refer_urls">
                    {(fields, { add }) => (
                      <div>
                        <Row className={styles.labelFormList}>参考URL</Row>
                        {fields.map(field => (
                          <Form.Item
                            className={`${styles.formListItem} ${styles.mb20}`}
                            name={[field.name, "name"]}
                            key={field.name}
                          >
                            <Row className={styles.rowItemInput}>
                              <Input placeholder="自己PRや企画に関するURL" />
                            </Row>
                          </Form.Item>
                        ))}
                        <Row onClick={() => add()} className={styles.addLink}>
                          ＋リンクを追加する
                        </Row>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>

              <Row className={styles.formArea}>
                <Col
                  lg={6}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formLabel}
                >
                  作りたいラリー キャンペーンへの応募は こちらの項目記入が
                  必要となります
                </Col>
                <Col
                  lg={{ span: 17, offset: 1 }}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.formWrapperCol}
                >
                  <Form.Item
                    name="introduction"
                    colon={false}
                    wrapperCol={24}
                    rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
                  >
                    <Input.TextArea
                      placeholder="どんなチェックインラリーを作りたいかをご記入ください。"
                      rows={ROW_TEXTAREA_CAMPAIGN}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Row className={styles.formItem}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btnSubmit}
              >
                ラリーマスター申請
              </Button>
            </Row>
          </Form>
        </div>
        {/* <div className={styles.about} data-aos="fade-up">
          <p>ラリーマスターの収益化について</p>
          <span>
            作成したチェックインラリーに、広告を貼ったりなど収益化するモデルを検討しております。
            <br />
            詳しくは申請後、ラリーマスターになった方へご紹介しております。
          </span>
        </div> */}
      </BlockWrapper>
    </section>
  );
};

export default AcceptRally;
