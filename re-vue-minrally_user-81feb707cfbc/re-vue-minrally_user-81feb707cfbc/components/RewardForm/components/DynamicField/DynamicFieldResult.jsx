import React from "react";
import { Form, Divider, Checkbox, Radio, Row } from "antd";
import styles from "../../styles.module.scss";

function DynamicFieldResult({ fields }) {
  return (
    <Form.List name="fields">
      {() => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                {field.type === "text" && (
                  <div className={styles.questionWrapper}>
                    <Row className={styles.questionWrapper__title}>
                      {field.title}
                    </Row>
                    <Row className={styles.questionWrapper__content}>
                      {field.anwsers}
                    </Row>
                  </div>
                )}
                {field.type === "textarea" && (
                  <div className={styles.questionWrapper}>
                    <Row className={styles.questionWrapper__title}>
                      {field.title}
                    </Row>
                    <Row className={styles.questionWrapper__content}>
                      {field.anwsers}
                    </Row>
                  </div>
                )}
                {field.type === "radio" && (
                  <Form.Item
                    name={[index, "name"]}
                    label={field.title}
                    rules={[{ required: field.required }]}
                    className={styles.formItemDart}
                  >
                    <Radio.Group className={styles.radioGroup} value={1}>
                      {field.anwsers.map(item => (
                        <>
                          <Radio
                            value={item.value}
                            className={styles.formLabel}
                          >
                            {item.title}
                          </Radio>
                          {item.checked && (
                            <img
                              src={item.image}
                              alt="reward"
                              className={styles.rewardImage}
                            />
                          )}
                        </>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                )}
                {field.type === "checkbox" && (
                  <Form.Item
                    name={[index, "name"]}
                    label={field.title}
                    rules={[{ required: field.required }]}
                    className={styles.formItemDart}
                  >
                    <Checkbox.Group
                      className={styles.checkboxGroup}
                      value={[1, 2]}
                    >
                      {field.anwsers.map(item => (
                        <>
                          <Checkbox value={item.value}>{item.title}</Checkbox>
                          {item.checked && (
                            <img
                              src={item.image}
                              alt="reward"
                              className={styles.rewardImage}
                            />
                          )}
                        </>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                )}
                <Divider />
              </div>
            ))}
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicFieldResult;
