/* eslint-disable import/no-unresolved */
import { MinusCircleOutlined } from "@ant-design/icons";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_URL_YOUTUBE } from "@utils/validate";
import { Col, Form, Input, Row } from "antd";
import styles from "../styles.module.scss";

const YoutubeLinks = () => {
  return (
    <Form.List name="youtube_videos">
      {(fields, { add, remove }) => (
        <div>
          <Row className={styles.label}>YouTube動画</Row>
          <div className={styles.note}>
            Youtubeの動画のURLを入力すると、ラリーページに動画が埋め込まれます。
          </div>

          {fields.map(field => (
            <div key={field.key}>
              <Row className={styles.formListItem}>
                <Col span={22}>
                  <Form.Item
                    name={field.name}
                    rules={[
                      {
                        pattern: REGEX_URL_YOUTUBE,
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
          ))}
          <Row onClick={() => add()} className={styles.addLink}>
            ＋リンクを追加する
          </Row>
        </div>
      )}
    </Form.List>
  );
};

export default YoutubeLinks;
