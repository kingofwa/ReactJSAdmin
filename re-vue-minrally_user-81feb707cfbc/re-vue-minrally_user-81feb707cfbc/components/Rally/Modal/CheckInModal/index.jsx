import { CustomButton } from "@components/common/buttons";
import UploadBtn from "@components/common/buttons/upload-button";
// import { ERROR_MESSAGES } from "@config/messages";
import { spotComment } from "@services/game";
import { generateFormDataMultipleFile } from "@utils/form";
// import { ERROR_MESSAGES } from "@utils/message-validate";
import { Divider, Form, Input, message, Modal, Row, Upload } from "antd";
import { random, size } from "lodash";
import { useEffect, useState } from "react";
import { MESSAGES } from "@config/messages";
import { MESSAGE_DURATION } from "@utils/constants";
// import { beforeUploadImage } from "@utils/image";
// import moment from "moment";
import styles from "./styles.module.scss";

// screen: rally_tab2-6チェックイン_sp

const { TextArea } = Input;

const MAX_IMG_COMMENT = 4;

const CheckInModal = ({
  visible,
  hideModal,
  infoSuccess,
  callback = () => {},
  hasCertificate,
  showModalComplete = () => {},
  showCouponModal = () => {},
  hasCoupon
}) => {
  const [form] = Form.useForm();
  const [listImage, setListImage] = useState([]);
  const [messageInfo, setMessage] = useState("");
  const [errUpload, setErrUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const icDone = [
    "329408978_909358523747526_8852092449694589216_n.gif",
    "icon-2.gif"
  ];
  const onCloseModal = () => {
    hideModal();
    form.resetFields();
    setListImage([]);
    if (hasCoupon) {
      showCouponModal();
    } else if (hasCertificate) {
      showModalComplete();
    }
  };
  const isEnabledSubmit = size(messageInfo) > 0 || size(listImage) > 0;
  const [iconIndex, setIconIndex] = useState();

  useEffect(() => {
    const index = random(0, 1);
    setIconIndex(index);
  }, [visible]);

  const onSubmit = async values => {
    if (!isEnabledSubmit) {
      onCloseModal();
    } else {
      try {
        setIsSubmit(true);
        const fileList = values?.photos?.fileList?.map(el => {
          return el.originFileObj;
        });
        const params = {};
        params.body = values.body || "";
        if (fileList) {
          params.photos = fileList;
        }
        const payload = generateFormDataMultipleFile(params, "photos");
        await spotComment(infoSuccess?.spotId, payload);
        message.success({
          content: MESSAGES.postSuccess,
          duration: MESSAGE_DURATION
        });
        callback();
        onCloseModal();
      } catch (error) {
        message.error(error);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      setListImage(fileList);
      form.setFieldsValue({ photos: { fileList } });
    }
  };

  const handleChangeMessage = e => {
    setMessage(e?.target?.value);
  };

  const beforeUpload = file => {
    const isValidType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isValidType) {
      setErrUpload(true);
      message.error(
        "画像フォーマットが正しくありません。 .png/.jpg/.gif 形式の画像を選択してください。"
      );
    }
    const isValidSize = file.size / 1024 / 1024 <= 20;
    if (!isValidSize) {
      setErrUpload(true);
      message.error("20MBまでで画像を選択してください。");
    }
    if (!isValidType || !isValidSize) {
      setErrUpload(true);
    } else {
      setErrUpload(false);
    }
    return false;
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.checkInModal}
        visible={visible}
        onCancel={onCloseModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.description}>{infoSuccess?.rallyName}</Row>
        <Row className={styles.name}> {infoSuccess?.name}</Row>
        <Row>
          <img
            className={styles.doneIcon}
            alt="ic"
            src={`/icons/${icDone[iconIndex]}`}
          />
        </Row>
        <Row className={styles.description}>チェックイン完了！</Row>
        <Row className={styles.time}>
          {infoSuccess?.latest_checked_in_at}
          {"  "}
          {infoSuccess?.n_of_times_user_checked_in}回目
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.helpText}>
          このスポットの思い出を残しませんか？
          <br />
          ※スポット詳細画面から後日投稿することも可能です。
        </Row>

        <Form
          className={styles.modalBody}
          form={form}
          name="comment"
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            required
            name="body"
            // rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          >
            <TextArea rows={6} onChange={handleChangeMessage} />
          </Form.Item>

          <Form.Item name="photos" className={styles.btnGroup}>
            <Upload
              className={styles.uploadImg}
              listType="picture-card"
              fileList={listImage}
              onPreview={false}
              onChange={handleChange}
              accept="image/png, image/jpeg, image/gif"
              // beforeUpload={beforeUpload}
              multiple
              showUploadList={{
                removeIcon: (
                  <img
                    src="/icons/icon-delete.png"
                    alt="icons"
                    className={styles.icClose}
                  />
                ),
                showPreviewIcon: false
              }}
            />
          </Form.Item>

          <Form.Item className={styles.btnGroup}>
            <UploadBtn
              className={styles.btnAction}
              showUploadList={false}
              listType="picture-card"
              fileList={listImage}
              onPreview={false}
              onChange={handleChange}
              accept="image/png, image/jpeg, image/gif"
              variant="primary"
              multiple
              btnProps={{
                size: "middle",
                disabled: size(listImage) === MAX_IMG_COMMENT
              }}
              beforeUpload={beforeUpload}
              maxCount={4}
              // max 4 img => disable btn
            >
              画像を追加
            </UploadBtn>

            <Row className={styles.note}> ※最大4枚</Row>

            <CustomButton
              size="middle"
              variant="submit"
              className={styles.btnAction}
              htmlType="submit"
              disabled={isSubmit}
              loading={isSubmit}
            >
              投稿する
            </CustomButton>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckInModal;
