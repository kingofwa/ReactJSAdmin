/* eslint-disable import/no-unresolved */
import { CustomButton } from "@components/common/buttons";
import Map from "@components/common/Map";
import LocationAutoComplete from "@components/LocationAutoComplete";
import PATHS from "@config/paths";
import { goToView } from "@utils/go-to-view";
import { ERROR_MESSAGES } from "@utils/message-validate";
// import { REGEX_NAME_NO_SPECIAL } from "@utils/validate";
import {
  Col,
  Form,
  Image,
  Input,
  // InputNumber,
  message,
  Row,
  Upload
} from "antd";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Scroll from "react-scroll";
import RelatedLinks from "./RelatedLinks";
import styles from "./styles.module.scss";

const SpotDetailForm = ({
  spotData,
  setListImage,
  listImage,
  onSubmit,
  locationInfo,
  setLocationInfo = () => {},
  setIsDraft = () => {},
  isEdit = false,
  rallyId,
  hasPlayer,
  setLocationPhoto = () => {},
  locationPhoto
}) => {
  const [form] = Form.useForm();
  const route = useRouter();
  const isEditRally = route?.query?.isEdit === "true";
  const [range, setRange] = useState();
  const [isErr, setIsErr] = useState(false);
  const scroll = Scroll.animateScroll;
  const [errUpload, setErrUpload] = useState(false);

  const onSubmitForm = values => {
    if (isEmpty(locationInfo?.address)) {
      setIsErr(true);
      scroll.scrollToTop();
    } else {
      setIsErr(false);
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (!isEdit) {
      form.setFieldsValue({
        related_links_attributes: [{ name: "", url: "" }]
      });
    }
  }, [spotData, isEdit]);

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      setListImage(fileList);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (spotData) {
      form.setFieldsValue(spotData);
      setRange(spotData?.range);
    }
  }, []);

  const onFinishFailed = error => {
    const idElement = `form-info_${error?.errorFields[0]?.name[0]}`;
    goToView(idElement);
  };

  const onCancel = () => {
    if (isEditRally) {
      router.push(PATHS.rallyEditSpotList.replace(/:rallyId/, rallyId));
    } else {
      router.push(PATHS.rallyCreateSpotList.replace(/:rallyId/, rallyId));
    }
  };

  const onChangeRange = value => {
    setRange(value);
  };

  // const beforeUpload = file => {
  //   const isValidSize = file.size / 1024 / 1024 <= 20;
  //   if (!isValidSize) {
  //     message.error("20MBまでで画像を選択してください。");
  //     setErrUpload(true);
  //   } else {
  //     setErrUpload(false);
  //   }
  //   if (!isValidSize) {
  //     return isValidSize;
  //   }
  //   return false;
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

  const renderLocation = () => {
    return (
      <Row>
        <Col span={24} className={styles.label}>
          位置情報設定<span className={styles.required}>必須</span>
        </Col>
        <Col span={24} className={styles.noteLocation}>
          下記のいずれかの方法で位置情報を設定してください。
          <br />
          {/* ❶スポット名検索してピンを立てから、範囲指定をする。
          <br />
          ❷地図に直接ピンを立ててから、範囲指定をする。
          <br />
          ❸地図上で指定範囲を点で囲む。 */}
          ❶スポット名を入力して検索
          <br />
          ❷住所を入力して検索
        </Col>
        <Col span={24} className={styles.selectAddress}>
          <LocationAutoComplete
            setLocationInfo={setLocationInfo}
            address={locationInfo?.address}
            disabled={hasPlayer}
            setLocationPhoto={setLocationPhoto}
            form={form}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        </Col>
        <Col span={24} className={styles.map}>
          <Map coordinates={locationInfo?.coordinates} range={range} />
        </Col>
        <Col className={styles.colRange}>
          <span className={styles.rangeLabel}>ピンからの範囲</span>
          <Form.Item
            label=""
            name="range"
            validateFirst
            rules={[
              { pattern: /^[1-9][0-9]*$/, message: ERROR_MESSAGES.invalid },
              {
                pattern:
                  /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1[0-9]{3}|2000)$/,
                message: "最大値は2000mです。"
              }
            ]}
          >
            {/* <InputNumber
              onChange={onChangeRange}
              defaultValue={105}
              max={2000}
            /> */}
            <Input onChange={onChangeRange} defaultValue={105} />
          </Form.Item>
          <div>m</div>
        </Col>
      </Row>
    );
  };

  const renderSpotName = () => {
    return (
      <Form.Item
        label="スポット名"
        name="name"
        rules={[
          { required: true, message: ERROR_MESSAGES.empty },
          { max: 40, message: ERROR_MESSAGES.maxLength.replace(/:count/, 40) }
        ]}
        className={styles.formItem}
      >
        <Input placeholder="最大40文字" disabled={hasPlayer} />
      </Form.Item>
    );
  };

  const renderPhotos = () => {
    const googlePhoto = locationPhoto || spotData?.google_image_url;
    return (
      <>
        <Form.Item
          label="スポット画像"
          name="photos"
          // rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          className={styles.formItemDefault}
        >
          <Upload
            listType="picture-card"
            fileList={listImage}
            onPreview={false}
            onChange={handleChange}
            beforeUpload={beforeUpload}
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
            multiple
            className={styles.uploadImg}
            accept="image/png, image/jpeg"
          >
            {listImage.length >= 8 ? null : (
              <img
                className={styles.icPlus}
                src="/icons/ic-plus.png"
                alt="ic-plus"
              />
            )}
          </Upload>
        </Form.Item>

        {googlePhoto && isEmpty(listImage) && (
          <Form.Item
            label="Googleマップの画像"
            className={styles.formItemDefault}
          >
            <Image src={googlePhoto} alt="google-photo" />
          </Form.Item>
        )}

        <div className={styles.noteType2}>
          ※Googleマップから自動で写真が選択されています。
          <br />
          ※好きな写真に変更することも可能です。
          <br />
          ※Googleマップの画像がない場合は、みんラリのデフォルト画像が表示されます。
        </div>
      </>
    );
  };

  const renderDescription = () => {
    return (
      <>
        <Form.Item
          label="スポット解説"
          name="description"
          rules={[
            {
              max: 500,
              message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
            }
          ]}
          className={styles.formItemDefault}
        >
          <Input.TextArea
            placeholder="スポットの説明や特徴などを自由に入力してください。（推奨500文字以内）"
            rows={10}
          />
        </Form.Item>
        <div className={styles.noteType2}>
          ※ラリー開始後の変更はできませんが、後から追記することは可能です。
        </div>
      </>
    );
  };

  const renderActions = () => {
    return (
      <div className={styles.btnGroup}>
        <CustomButton
          type="primary"
          className={styles.btnSubmit}
          variant="community"
          htmlType="submit"
          onClick={() => setIsDraft(false)}
        >
          登録して戻る
        </CustomButton>
        {isEdit ? (
          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={onCancel}
          >
            キャンセル
          </CustomButton>
        ) : (
          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            htmlType="submit"
            onClick={() => setIsDraft(true)}
          >
            下書き保存
          </CustomButton>
        )}
      </div>
    );
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmitForm}
        name="form-info"
        className={styles.formWrapper}
        onFinishFailed={onFinishFailed}
      >
        {renderLocation()}
        {renderSpotName()}
        {renderPhotos()}
        {renderDescription()}
        <RelatedLinks />
        {renderActions()}
      </Form>
    </div>
  );
};

export default SpotDetailForm;
