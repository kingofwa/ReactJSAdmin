/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import UploadBtn from "@components/common/buttons/upload-button";
import { reviewComment, spotComment } from "@services/game";
import { reviewSeriComment } from "@services/seri";
import { updateComment } from "@services/user/info";
import { COMMENT_TYPE, MESSAGE_DURATION } from "@utils/constants";
import { generateFormDataMultipleFile } from "@utils/form";
import { srcToFile } from "@utils/image";
// import { ERROR_MESSAGES } from "@utils/message-validate";
import { Form, Input, message, Modal, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import { MESSAGES } from "@config/messages";
import { isEmpty, map, size } from "lodash";
import styles from "./styles.module.scss";

// screen: rally_tab2-6スポットメモリー記入欄_sp

const { TextArea } = Input;

// const MAX_IMG_COMMENT = 4;

const SpotMemoryModal = ({
  visible,
  hideModal,
  spotId,
  onFinish,
  type,
  gameId,
  commentInfo,
  changeContent,
  isSpot = false
}) => {
  const [form] = Form.useForm();
  const [listImage, setListImage] = useState([]);
  const [messageInfo, setMessage] = useState("");
  const [errUpload, setErrUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(async () => {
    if (type === COMMENT_TYPE.EDIT && visible) {
      if (commentInfo?.photo_urls) {
        const photo = await srcToFile(commentInfo?.photo_urls);
        const listImg = map(photo, (el, index) => {
          return {
            uid: index,
            originFileObj: el?.originFileObj,
            thumbUrl: el?.url
          };
        });
        setListImage(listImg);
        form.setFieldsValue({
          body: commentInfo?.body,
          photos: { fileList: photo }
        });
        setMessage(commentInfo?.body);
      } else {
        form.setFieldsValue({
          body: commentInfo?.body
        });
      }
    }
  }, [changeContent, visible]);

  const onclose = () => {
    hideModal();
    setListImage([]);
    form.setFieldsValue({
      body: "",
      photos: ""
    });
  };

  const onSubmit = async values => {
    const isDisabledSubmit = isEmpty(messageInfo) && size(listImage) === 0;
    if (!isDisabledSubmit) {
      setIsSubmit(true);
      const photos = values?.photos?.fileList;
      let fileList = null;

      if (!isEmpty(photos)) {
        fileList = photos?.map(el => {
          return el.originFileObj;
        });
      }
      const params = { body: values.body || "", photos: fileList };
      const payload = await generateFormDataMultipleFile(params, "photos");
      try {
        if (type === COMMENT_TYPE.SPOT) {
          await spotComment(spotId, payload);
        } else if (type === COMMENT_TYPE.REVIEW) {
          await reviewComment(gameId, payload);
        } else if (type === COMMENT_TYPE.EDIT) {
          await updateComment(commentInfo?.id, payload);
        } else if (type === COMMENT_TYPE.REVIEW_SERI) {
          await reviewSeriComment(gameId, payload);
        }
        // message.success("コメント成功");
        message.success({
          content: MESSAGES.postSuccess,
          duration: MESSAGE_DURATION
        });
        onclose();
        onFinish();
      } catch (error) {
        message.error(error?.message);
      } finally {
        setIsSubmit(false);
      }
    } else {
      onclose();
    }
  };

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      setListImage(fileList);
      form.setFieldsValue({ photos: { fileList } });
    }
  };

  // const beforeUpload = file => {
  //   const isValidSize = file.size / 1024 / 1024 <= 20;
  //   if (!isValidSize) {
  //     message.error("20MBまでで画像を選択してください。");
  //     setErrUpload(true);
  //   } else {
  //     setErrUpload(false);
  //   }
  // };

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

  const handleChangeMessage = e => {
    setMessage(e?.target?.value);
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.spotMemoryModal}
        visible={visible}
        onCancel={onclose}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}>
          {isSpot ? "スポットメモリーを書く" : "レビューを書く"}
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
            <TextArea rows={10} onChange={handleChangeMessage} />
          </Form.Item>

          <Form.Item name="photos" className={styles.btnGroup}>
            <Upload
              className={styles.uploadImg}
              listType="picture-card"
              fileList={listImage}
              onPreview={false}
              onChange={handleChange}
              accept="image/png, image/jpeg, image/gif"
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
              btnProps={{
                size: "middle",
                disabled: size(listImage) === 4
              }}
              maxCount={4}
              // max 4 img => disable btn
              beforeUpload={beforeUpload}
              disabled={isSubmit}
              loading={isSubmit}
              multiple
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

export default SpotMemoryModal;
