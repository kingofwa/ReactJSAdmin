import { MinusCircleOutlined, CaretDownOutlined } from "@ant-design/icons";
import { getUserInfo, updateUser } from "@services/user/info";
import { generateFormData } from "@utils/form";
import { formatRelatedLinks, isInOneWeek } from "@utils/helper";
import { beforeUpload, getBase64 } from "@utils/image";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_URL } from "@utils/validate";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload
} from "antd";
import { get, isEmpty, omit, size } from "lodash";
import { useEffect, useState } from "react";
import { MESSAGES } from "@config/messages";
import { MESSAGE_DURATION } from "@utils/constants";
import styles from "./style.module.scss";

const { Option } = Select;
const { TextArea } = Input;

const UpdateProfileModal = ({ visible, hideModal, getProfile }) => {
  const [userInfo, setUserInfo] = useState({});
  // const [errUpload, setErrUpload] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState({});
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);

  const [form] = Form.useForm();

  const onSubmit = async values => {
    try {
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      let params = {
        ...values,
        information: values?.information.trim(),
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        )
      };

      params = omit(params, ["avatar", "user_name"]);

      if (values.avatar) {
        params.avatar = values.avatar?.file?.originFileObj;
      }

      if (userInfo?.user_name !== values?.user_name) {
        params.user_name = values?.user_name;
      }
      const payload = generateFormData(params);
      const res = await updateUser(payload);
      getProfile();
      hideModal();
      if (res?.status === "success") {
        message.success({
          content: MESSAGES.saveSuccessfully,
          duration: MESSAGE_DURATION
        });
      }
    } catch (error) {
      message.error(error);
    }
  };

  const getInfo = async () => {
    try {
      const user = await getUserInfo();
      // const avatar = await srcToFile(user?.avatar_url);
      setUserInfo(user);
      const relatedLinks =
        user?.related_links?.length > 0
          ? user?.related_links
          : [{ name: "", url: "" }];

      setPreRelatedLinks(user?.related_links);

      const data = {
        user_name: user?.user_name,
        information: user?.information,
        related_links_attributes: relatedLinks,
        show_following_rally: user?.show_following_rally,
        show_favoriteing_rally: user?.show_favoriteing_rally,
        show_participating_rally: user?.show_participating_rally
      };

      if (userInfo?.is_creator) {
        data.show_created_rally = user?.show_created_rally;
      }

      form.setFieldsValue(data);

      setAvatarUrl(user?.avatar_url);
    } catch (error) {
      message.error(error?.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, [visible]);

  const triggerChangeImg = file => {
    // if (!errUpload) {
    getBase64(file.file.originFileObj).then(res => setAvatarUrl(res));
    // }
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        visible={visible}
        onCancel={hideModal}
        cancelButtonProps={{ className: "d-none" }}
        okButtonProps={{ className: "d-none" }}
        // width={600}
        wrapClassName={styles.modalContainer}
        closeIcon={
          <img
            src="/icons/ic-xmark-gray.png"
            alt="ic-xmark"
            className={styles.icClose}
          />
        }
      >
        <Row className={styles.titleModal} justify="center">
          プロフィール編集
        </Row>
        <Form
          className={styles.modalBody}
          form={form}
          name="update-profile"
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item name="avatar">
            <Upload
              className={styles.avatarWrapper}
              listType="picture-card"
              showUploadList={false}
              onChange={triggerChangeImg}
              beforeUpload={beforeUpload}
              accept="image/png, image/jpeg, image/gif"
            >
              <Avatar
                className={styles.avatar}
                src={avatarUrl ?? "/img/profile/avatar-default.png"}
              />
              <Button className={styles.btnUpload}>変更</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            required
            name="user_name"
            className={styles.formItemCS}
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              // {
              //   pattern: REGEX_DISPLAY_NAME_DEFAULT,
              //   message: ERROR_MESSAGES.invalid
              // },
              {
                max: 15,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 15)
              }
            ]}
          >
            <Input
              placeholder="ユーザー名"
              disabled={isInOneWeek(userInfo?.user_name_updated_at)}
            />
          </Form.Item>
          <Row className={styles.description} justify="center">
            ※ユーザー名は1週間に1回のみ変更可能です。
          </Row>

          <Form.Item
            required
            name="information"
            className={styles.formItem}
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              {
                max: 160,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 160)
              }
            ]}
          >
            <TextArea rows={6} placeholder="自己紹介が入ります。" />
          </Form.Item>

          <Form.List name="related_links_attributes">
            {(fields, { add, remove }) => (
              <div>
                <Row className={styles.label}>リンク</Row>

                {fields.map(field => {
                  return (
                    <div key={field.key}>
                      <Row
                        className={styles.formItemList}
                        justify="space-between"
                      >
                        <Col span={11}>
                          <Form.Item
                            required
                            name={[field.name, "name"]}
                            rules={[
                              ({ getFieldValue }) => {
                                const hasRelatedLink =
                                  size(
                                    getFieldValue("related_links_attributes")
                                  ) > 1;
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
                                      (isEmpty(value) ||
                                        size(
                                          getFieldValue(
                                            "related_links_attributes"
                                          ).filter(
                                            d => get(d, "name") === value
                                          )
                                        ) !== 1) &&
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
                                max: 12,
                                message: ERROR_MESSAGES.maxLength.replace(
                                  /:count/,
                                  12
                                )
                              }
                            ]}
                          >
                            <Input placeholder="リンクのタイトル" />
                          </Form.Item>
                        </Col>
                        <Col span={11}>
                          <Form.Item
                            required
                            name={[field.name, "url"]}
                            className={styles.formItemList}
                            rules={[
                              ({ getFieldValue }) => {
                                const hasRelatedLink =
                                  size(
                                    getFieldValue("related_links_attributes")
                                  ) > 1;
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
                        <Col span={1}>
                          {/* {fields.length > 1 ? ( */}
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
                  <span>＋リンクを追加する</span>
                </Row>
              </div>
            )}
          </Form.List>

          <Divider />

          <Row className={styles.formItem}>
            <Col span={16} className={styles.label}>
              <span>
                {/* 参加中のラリー */}
                参加中のラリー/グランドラリー
              </span>
            </Col>
            <Col offset={1} span={7}>
              <Form.Item
                required
                name="show_participating_rally"
                className={styles.formItem}
              >
                <Select
                  defaultValue
                  suffixIcon={
                    <CaretDownOutlined className="ant-select-suffix" />
                  }
                >
                  <Option value>公開</Option>
                  <Option value={false}>非公開</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formItem}>
            <Col span={16} className={styles.label}>
              <span>いいねしたラリー/グランドラリー</span>
            </Col>
            <Col offset={1} span={7}>
              <Form.Item
                required
                name="show_favoriteing_rally"
                className={styles.formItem}
              >
                <Select
                  defaultValue
                  suffixIcon={
                    <CaretDownOutlined className="ant-select-suffix" />
                  }
                >
                  <Option value>公開</Option>
                  <Option value={false}>非公開</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formItem}>
            <Col span={16} className={styles.label}>
              <span>フォロー中/フォロワーのユーザー</span>
            </Col>
            <Col offset={1} span={7}>
              <Form.Item
                required
                name="show_following_rally"
                className={styles.formItem}
              >
                <Select
                  defaultValue
                  suffixIcon={
                    <CaretDownOutlined className="ant-select-suffix" />
                  }
                >
                  <Option value>公開</Option>
                  <Option value={false}>非公開</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {userInfo?.is_creator && (
            <Row className={styles.formItem}>
              <Col span={16} className={styles.label}>
                <span>作成したラリー/グランドラリー</span>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item
                  required
                  name="show_created_rally"
                  className={styles.formItem}
                >
                  <Select
                    defaultValue
                    suffixIcon={
                      <CaretDownOutlined className="ant-select-suffix" />
                    }
                  >
                    <Option value>公開</Option>
                    <Option value={false}>非公開</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row className={styles.formItem} justify="center">
            <Button htmlType="submit" className={styles.submitBtn}>
              保存して閉じる
            </Button>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
