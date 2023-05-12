import React from "react";
import { Form, Divider, Checkbox, Radio, Input } from "antd";
import styles from "../../styles.module.scss";

function DynamicFieldInput({ fields }) {
  const { TextArea } = Input;
  return (
    <Form.List name="fields">
      {() => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[index, "name"]}
                  label={field.title}
                  rules={[{ required: field.required }]}
                  className={styles.formItem}
                >
                  {field.type === "text" && <Input placeholder="回答" />}
                  {field.type === "textarea" && (
                    <TextArea className={styles.textArea} placeholder="回答" />
                  )}
                  {field.type === "radio" && (
                    <Radio.Group className={styles.radioGroup} value={1}>
                      {field.items.map(item => (
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
                  )}
                  {field.type === "checkbox" && (
                    <Checkbox.Group
                      className={styles.checkboxGroup}
                      value={[1, 2]}
                    >
                      {field.items.map(item => (
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
                  )}
                </Form.Item>
                <Divider />
              </div>
            ))}
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicFieldInput;
