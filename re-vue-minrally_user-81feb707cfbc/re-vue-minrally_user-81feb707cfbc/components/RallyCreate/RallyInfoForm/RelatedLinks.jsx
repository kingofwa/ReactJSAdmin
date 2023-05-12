/* eslint-disable import/no-unresolved */
import { MinusCircleOutlined } from "@ant-design/icons";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_URL } from "@utils/validate";
import { Col, Form, Input, Row } from "antd";
import { get, isEmpty, size } from "lodash";
import styles from "../styles.module.scss";

const RelatedLinks = () => {
  return (
    <Form.List name="related_links_attributes">
      {(fields, { add, remove }) => (
        <div className={styles.listWrapper}>
          <Row className={styles.label}>関連リンク</Row>
          <div className={styles.note}>
            このラリーに関連したリンクを設定することができます。
            <br />
            関連リンクを設定する場合「リンクのタイトル」と「URL」いずれも入力してください。
          </div>
          {fields.map(field => {
            return (
              <div key={field.key}>
                <Row className={styles.formListItem}>
                  <Col span={11}>
                    <Form.Item
                      required
                      name={[field.name, "name"]}
                      placeholder="リンクのタイトル"
                      rules={[
                        ({ getFieldValue }) => {
                          const hasRelatedLink =
                            size(getFieldValue("related_links_attributes")) > 1;
                          return {
                            validator(_, value) {
                              if (
                                (isEmpty(value) || value === undefined) &&
                                hasRelatedLink
                              ) {
                                return Promise.reject(
                                  new Error(ERROR_MESSAGES.empty)
                                );
                              }
                              if (
                                (!value ||
                                  getFieldValue(
                                    "related_links_attributes"
                                  ).filter(d => get(d, "name") === value)
                                    .length !== 1) &&
                                hasRelatedLink
                              ) {
                                return Promise.reject(
                                  new Error(ERROR_MESSAGES.duplicateLink)
                                );
                              }
                              return Promise.resolve();
                            }
                          };
                        },
                        {
                          max: 24,
                          message: ERROR_MESSAGES.maxLength.replace(
                            /:count/,
                            24
                          )
                        }
                      ]}
                    >
                      <Input placeholder="リンクのタイトル" />
                    </Form.Item>
                  </Col>
                  <Col offset={1} span={10}>
                    <Form.Item
                      required
                      name={[field.name, "url"]}
                      placeholder="URL"
                      rules={[
                        ({ getFieldValue }) => {
                          const hasRelatedLink =
                            size(getFieldValue("related_links_attributes")) > 1;
                          return {
                            validator(_, value) {
                              if (
                                (isEmpty(value) || value === undefined) &&
                                hasRelatedLink
                              ) {
                                return Promise.reject(
                                  new Error(ERROR_MESSAGES.empty)
                                );
                              }
                              if (
                                (!value ||
                                  getFieldValue(
                                    "related_links_attributes"
                                  ).filter(d => get(d, "url") === value)
                                    .length !== 1) &&
                                hasRelatedLink
                              ) {
                                return Promise.reject(
                                  new Error(ERROR_MESSAGES.duplicateLink)
                                );
                              }
                              return Promise.resolve();
                            }
                          };
                        },
                        {
                          pattern: REGEX_URL,
                          message: ERROR_MESSAGES.invalid
                        }
                      ]}
                    >
                      <Input placeholder="URL" />
                    </Form.Item>
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
              </div>
            );
          })}
          <Row onClick={() => add()} className={styles.addLink}>
            ＋リンクを追加する
          </Row>
        </div>
      )}
    </Form.List>
  );
};

export default RelatedLinks;
