import { CustomButton } from "@components/common/buttons";
import { PHOTO, RALLY_PERIOD } from "@utils/constants";
import { goToView } from "@utils/go-to-view";
import { beforeUpload, getBase64 } from "@utils/image";
import { ERROR_MESSAGES } from "@utils/message-validate";
import {
  Avatar,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Upload
} from "antd";
import { useEffect, useState } from "react";
// import useSwitchRallyVersion from "hooks/useSwitchRallyVersion";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import DateRangeInput from "@components/common/date-range-input/DateRangeInput";
import { isEmpty, map, replace } from "lodash";
// import DateRangeInputCustom from "@components/common/form/DateRangeInputCustom";
import moment from "moment-timezone";
import { DATE_NIHON } from "@utils/date";
import { useAuth } from "@contexts/auth";
import styles from "../styles.module.scss";
import RelatedLinks from "./RelatedLinks";
import YoutubeLinks from "./YoutubeLinks";

const RallyInfoForm = ({
  onSubmit,
  rallyInfo,
  isEdit,
  topImage,
  setIsDraft,
  isCreate,
  googleImage
}) => {
  const [form] = Form.useForm();
  const [showPeriod, setShowPeriod] = useState(false);
  // const { renderSwitchRallyVersion } = useSwitchRallyVersion();
  const [uploadPhoto, setUploadPhoto] = useState();
  const [topPhoto, setTopPhoto] = useState();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (rallyInfo) {
      form.setFieldsValue(rallyInfo);
    }
    if (topImage) {
      setTopPhoto(topImage);
    }
  }, [rallyInfo]);

  const onChangePeriod = e => {
    if (e.target?.value === RALLY_PERIOD.none) {
      setShowPeriod(false);
    } else {
      setShowPeriod(true);
    }
  };

  useEffect(() => {
    if (!isEdit) {
      form.setFieldsValue({
        youtube_videos: [""],
        related_links_attributes: [{ name: "", url: "" }],
        period: RALLY_PERIOD.none
      });
    } else if (
      rallyInfo?.periodDate?.start_date &&
      rallyInfo?.periodDate?.end_date
    ) {
      form.setFieldsValue({
        period: RALLY_PERIOD.expired
      });
      setShowPeriod(true);
    } else if (
      !rallyInfo?.periodDate?.start_date &&
      !rallyInfo?.periodDate?.end_date
    ) {
      form.setFieldsValue({
        period: RALLY_PERIOD.none
      });
      setShowPeriod(false);
    }
  }, [rallyInfo, isEdit]);

  const onFinishFailed = error => {
    // Go to filed error when submit failed
    const id = `form-info_${error?.errorFields[0]?.name[0]}`;
    goToView(id);
  };

  const triggerChangeImg = file => {
    getBase64(file.file.originFileObj).then(res => setUploadPhoto(res));
  };

  const onChangeTag = tags => {
    const newTag = map(tags, tag => {
      const tagValue = replace(tag, new RegExp(/#/, "g"), "");
      const newTagValue = replace(tagValue, new RegExp(/\s/g, "g"), "");
      return `#${newTagValue}`;
    });
    form.setFieldsValue({
      tags: newTag
    });
  };

  const onDelPhoto = event => {
    if (!uploadPhoto) {
      setTopPhoto(null);
      form.setFieldsValue({ ...form.getFieldsValue, top_photo: PHOTO.delete });
    } else {
      setUploadPhoto(null);
      form.setFieldsValue({ ...form.getFieldsValue, top_photo: null });
    }
    event.stopPropagation();
  };

  const renderActions = () => {
    if (isEdit) {
      return (
        <Form.Item className={styles.formItemBtn}>
          <CustomButton
            type="primary"
            htmlType="submit"
            className={styles.btnSubmit}
            variant="community"
            onClick={() => setIsDraft(false)}
          >
            更新して次へ進む
          </CustomButton>
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            variant="community"
            htmlType="submit"
            onClick={() => setIsDraft(true)}
          >
            更新してトップに戻る
          </CustomButton>

          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={() => router.push(PATHS.mypageCreator)}
          >
            キャンセル
          </CustomButton>
        </Form.Item>
      );
    }
    return (
      <Form.Item className={styles.formItemBtn}>
        <CustomButton
          type="primary"
          htmlType="submit"
          className={styles.btnSubmit}
          variant="community"
          onClick={() => setIsDraft(false)}
        >
          次へ進む
        </CustomButton>

        <CustomButton
          type="primary"
          className={styles.btnSaveDraft}
          variant="community"
          htmlType="submit"
          onClick={() => setIsDraft(true)}
        >
          下書き保存
        </CustomButton>
      </Form.Item>
    );
  };

  const renderNoteInput = () => {
    return (
      <>
        <div className={styles.noteCreat}>
          {auth?.user?.user_name}さんからの注意事項
          {rallyInfo?.note_updated_at && (
            <span>
              追記日：
              {moment(rallyInfo?.note_updated_at)
                .tz("Asia/Tokyo")
                .format(DATE_NIHON)}
            </span>
          )}
        </div>
        <Form.Item
          name="note"
          // rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          className={styles.formItemDefault}
        >
          <Input.TextArea
            placeholder="追記したい注意事項を入力してください。"
            rows={10}
          />
        </Form.Item>
        <div className={styles.noteType2}>
          ※ラリー開始後の変更はできませんが、後から追記することは可能です。
        </div>
      </>
    );
  };

  const renderNotes = () => {
    return (
      <>
        <Row className={styles.label}>注意事項</Row>
        <div className={styles.note}>
          以下の注意事項はデフォルトで表示されます。
          <br />
          その他の注意事項を追記することができます。
        </div>
        <div className={styles.noteDefault}>
          ・参加費は無料です。 <br />
          ・ラリーの開催期間は原則無制限としますが、予告なく中止・変更する場合がございます。
          <br />
          ・写真・イラストはイメージです。 <br />
          ・歩きながら、運転しながらのスマートフォンのご使用は危険ですのでおやめください。
          <br />
          ・体調が優れない方は外出を控えるようにお願いします。 <br />
          ・手洗いや手指消毒を行うとともに、マスクの着用にご協力をお願いします。公共のルールを守りましょう。
          <br />
          ・交通ルールをはじめ、公共のルールをしっかり守りましょう。 <br />
          ・私有地や建物など、許可なく立ち入ってはいけない場所には入らないでください。
          <br />
          ・公共の場でのマナーを忘れずに。公園や公共施設などの公共の場や、人が多く集まる場所では、周囲の環境や周りの人々への配慮を心がけましょう。
          <br />
          ・ラリー参加中には周りの人々や周辺の住民の方々に迷惑をかけないよう、大きな声を出したり、騒いだりすることはやめましょう。
        </div>
      </>
    );
  };

  const renderDescription = () => {
    return (
      <>
        <Form.Item
          label="ラリー説明"
          name="description"
          rules={[
            { required: true, message: ERROR_MESSAGES.empty },
            {
              max: 500,
              message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
            }
          ]}
          className={styles.formItemDefault}
        >
          <Input.TextArea
            placeholder="ラリーのコンセプトや目的などの説明を自由に入力してください。(推奨500文字以内)"
            rows={10}
          />
        </Form.Item>
        <div className={styles.noteType2}>
          ※ラリー開始後の変更はできませんが、後から追記することは可能です。
        </div>
      </>
    );
  };

  const renderPeriodSetting = () => {
    return (
      <>
        <Row className={styles.label} align="middle">
          ラリー期間設定 <span className={styles.required}>必須</span>
        </Row>
        <Form.Item
          name="period"
          colon={false}
          className={styles.formItemDefault}
        >
          <Radio.Group
            className={styles.radioGroup}
            onChange={onChangePeriod}
            defaultValue={RALLY_PERIOD.none}
          >
            <Radio value={RALLY_PERIOD.none}>無制限</Radio>
            <Radio value={RALLY_PERIOD.expired}>期限あり</Radio>
          </Radio.Group>
        </Form.Item>
        {showPeriod && (
          <DateRangeInput
            allowClear
            name="periodDate"
            disabledDate={
              isEdit ? moment(rallyInfo?.created_at).tz("Asia/Tokyo") : moment()
            }
            required
          />
        )}
      </>
    );
  };

  const renderHashtags = () => {
    return (
      <>
        <Row className={styles.label} align="middle">
          ハッシュタグ設定 <span className={styles.required}>必須</span>
        </Row>
        <Row className={styles.note}>
          ラリーのジャンルやキーワードを設定してください。
          <br />
          人気なタグを設定するとラリーを見つけてもらいやすくなります。
        </Row>
        <Form.Item
          name="tags"
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          className={styles.formItemDefault}
        >
          <Select
            mode="tags"
            className={styles.hashTag}
            placeholder="#グルメ #ラーメン #東京都"
            onChange={onChangeTag}
            dropdownStyle={{ display: "none" }}
          />
        </Form.Item>
        <Row className={styles.noteType2}>
          ※複数のタグを付けるときは、タグごとに「エンター」「改行」を押してください。
        </Row>
      </>
    );
  };

  const renderPhotos = () => {
    const hasPhoto = !isEmpty(uploadPhoto) || !isEmpty(topPhoto);
    if (!rallyInfo && !isCreate) {
      return <Skeleton />;
    }
    if (!isCreate) {
      return (
        <>
          <Form.Item
            label="トップ画像"
            name="top_photo"
            className={styles.formItemDefault}
          >
            <Upload
              className={styles.avatarWrapper}
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              onChange={triggerChangeImg}
              beforeUpload={beforeUpload}
              onPreview={false}
              accept="image/png, image/jpeg, image/gif"
            >
              <div className={styles.rallyImage}>
                <Avatar
                  className={styles.avatar}
                  src={
                    uploadPhoto ||
                    topPhoto ||
                    googleImage ||
                    "/img/rally-placeholder-image.png"
                  }
                  alt="rally-photo"
                />
                <img
                  src="/icons/ic-camera.png"
                  alt="ic-camera"
                  className={styles.icon}
                />
                {hasPhoto && (
                  <div onClick={onDelPhoto} className={styles.icClose}>
                    <img src="/icons/icon-delete.png" alt="icons" />
                  </div>
                )}
              </div>
            </Upload>
          </Form.Item>
          <div className={styles.noteType2}>
            ※設定しない場合は、スポット画像が表示されます。
          </div>
        </>
      );
    }
    return null;
  };

  const renderRallyName = () => {
    return (
      <Form.Item
        label="ラリー名"
        name="name"
        rules={[
          { required: true, message: ERROR_MESSAGES.empty },
          { max: 40, message: ERROR_MESSAGES.maxLength.replace(/:count/, 40) }
        ]}
        className={styles.formItem}
      >
        <Input placeholder="最大40文字" />
      </Form.Item>
    );
  };
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        name="form-info"
        className={styles.formWrapper}
      >
        {/* {isEdit && renderSwitchRallyVersion()} */}
        {renderRallyName()}
        {isEdit && renderPhotos()}
        {renderHashtags()}
        {renderPeriodSetting()}
        {renderDescription()}
        {renderNotes()}
        {renderNoteInput()}
        <YoutubeLinks />
        <RelatedLinks />
        {renderActions()}
      </Form>
    </div>
  );
};

export default RallyInfoForm;
