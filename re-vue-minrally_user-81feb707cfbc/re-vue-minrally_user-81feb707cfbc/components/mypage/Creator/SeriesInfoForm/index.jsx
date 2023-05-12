/* eslint-disable no-plusplus */
import { CustomButton } from "@components/common/buttons";
import DateRangeInput from "@components/common/date-range-input/DateRangeInput";
import { MESSAGES } from "@config/messages";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import {
  DEFAULT_TEMPLATE_CERTIFICATE,
  MESSAGE_DURATION,
  PHOTO,
  RALLY_PERIOD
} from "@utils/constants";
import { beforeUpload, getBase64 } from "@utils/image";
import { ERROR_MESSAGES } from "@utils/message-validate";
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Skeleton,
  Upload
} from "antd";
import { isEmpty, map, replace } from "lodash";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getGamesInSeri } from "../../service";
import GrandRallyCertiModal from "./components/GrandRallyCertiModal";
import ModalRallySelection from "./components/ModalRallySelection";
import styles from "./styles.module.scss";

const SeriesInfoForm = ({ onSubmit, iSubmit, isEdit, seriesInfo }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [visible, setVisible] = useState(false);
  const [listGames, setListGames] = useState([]);
  const [gameSelect, setGameSelect] = useState([]);
  const [isOpenSeriModal, setIsOpenSeriModal] = useState(false);
  const [certificateSeri, setCertificateSeri] = useState({
    certificate_image_template_attributes: { ...DEFAULT_TEMPLATE_CERTIFICATE }
  });

  const [initCertificateSeri, setInitCertificateSeri] = useState({});
  // const [avatarUrl, setAvatarUrl] = useState("");
  const [googlePhoto, setGooglePhoto] = useState();
  const [uploadPhoto, setUploadPhoto] = useState();
  const [topPhoto, setTopPhoto] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectGameStock, setSelectGameStock] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);

  const fetchGamesSelect = async () => {
    try {
      showLoadingAnim();
      if (seriesInfo?.id) {
        const res = await getGamesInSeri({ serie_id: seriesInfo.id });
        setListGames(res);
      } else {
        const res = await getGamesInSeri();
        setListGames(res);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (seriesInfo) {
      setTopPhoto(seriesInfo?.top_photo_url);
      setGooglePhoto(seriesInfo?.google_image_url);
      const gameIds = seriesInfo?.games?.map(item => {
        return item.id;
      });
      form.setFieldsValue({
        ...seriesInfo,
        tags: seriesInfo?.tag_list,
        game_ids: gameIds
      });

      if (seriesInfo?.certificate_image_template?.id) {
        setInitCertificateSeri(seriesInfo?.certificate_image_template);
      }

      if (seriesInfo?.start_date && seriesInfo?.end_date) {
        form.setFieldsValue({
          periodDate: {
            start_date: moment(seriesInfo.start_date).tz("Asia/Tokyo"),
            end_date: moment(seriesInfo.end_date).tz("Asia/Tokyo")
          },
          period: RALLY_PERIOD.expired
        });
        setShowPeriod(true);
      }

      const gameStock = map(seriesInfo?.games, game => game?.id);
      setSelectGameStock(gameStock);
      setGameSelect(seriesInfo?.games);
      let certificate = { ...initCertificateSeri };

      // delete certificate when exits certificate (init)
      if (initCertificateSeri?.id)
        certificate = { ...certificate, _destroy: true };
      setCertificateSeri({
        certificate_image_template_attributes: certificate
      });
    } else {
      setCertificateSeri({
        certificate_image_template_attributes: {
          ...DEFAULT_TEMPLATE_CERTIFICATE
        }
      });
    }
    fetchGamesSelect();
  }, [seriesInfo, initCertificateSeri]);

  const submitGrandCertificate = value => {
    let certificate = value;
    // edit certificate
    if (initCertificateSeri?.id) {
      certificate = { ...certificate, id: initCertificateSeri?.id };
      // continue to edit
      // if (isShowCertificate)
      //   certificate = { ...certificate, id: initCertificateSeri?.id };
      // // delete certificate
      // else
      //   certificate = {
      //     ...certificate,
      //     id: initCertificateSeri?.id,
      //     _destroy: true
      //   };
    }
    setCertificateSeri({ certificate_image_template_attributes: certificate });
    setIsOpenSeriModal(false);
    message.success({
      content: MESSAGES.saveSuccessfully,
      duration: MESSAGE_DURATION
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const onSelectGames = games => {
    let list = [];

    for (let i = 0; i < listGames?.data.length; i++) {
      for (let j = 0; j < games.length; j++) {
        if (listGames?.data[i].id === games[j]) {
          list = [...list, listGames?.data[i]];
        }
      }
    }
    setGameSelect(list);
    form.setFieldsValue({ game_ids: games });
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

  const onCancel = () => {
    message.warning({ content: MESSAGES.cancel, duration: MESSAGE_DURATION });
    router.push(PATHS.mypageCreator);
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

  const onChangePeriod = e => {
    if (e.target?.value === RALLY_PERIOD.none) {
      setShowPeriod(false);
    } else {
      setShowPeriod(true);
    }
  };

  const onFinish = values => {
    const newValue = {
      ...values,
      certificateSeri
    };
    onSubmit(newValue);
  };

  const renderActions = () => {
    return (
      <div className={styles.btnGroup}>
        <CustomButton
          type="primary"
          className={styles.btnSubmit}
          variant="community"
          htmlType="submit"
          disabled={iSubmit}
        >
          保存して戻る
        </CustomButton>
        <CustomButton
          type="primary"
          className={styles.btnSaveDraft}
          variant="community"
          disabled={iSubmit}
          onClick={onCancel}
        >
          キャンセル
        </CustomButton>
      </div>
    );
  };

  const renderPhoto = () => {
    const hasPhoto = !isEmpty(uploadPhoto) || !isEmpty(topPhoto);
    if (isLoading) {
      return <Skeleton />;
    }
    return (
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
          accept="image/png, image/jpeg, image/gif"
        >
          <div className={styles.rallyImage}>
            <Avatar
              className={styles.avatar}
              src={
                uploadPhoto ||
                topPhoto ||
                googlePhoto ||
                "/img/rally-placeholder-image.png"
              }
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
            disabledDate={
              isEdit
                ? moment(seriesInfo?.created_at).tz("Asia/Tokyo")
                : moment()
            }
            allowClear
            name="periodDate"
            required
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className={styles.formContainer}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
          form={form}
        >
          <Form.Item
            label="グランドラリー名"
            name="name"
            colon={false}
            className={styles.formItem}
            required
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              {
                max: 40,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 40)
              },
              {
                min: 2,
                message: ERROR_MESSAGES.minLength.replace(/:count/, 2)
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            required
            colon={false}
            wrapperCol={24}
            className={styles.formItem}
            label="グランドラリー説明文"
            name="description"
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              {
                max: 500,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
              }
            ]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>

          {isEdit && renderPhoto()}
          <div className={styles.noteType2}>
            ※未設定の場合は、属しているラリーのトップ画像が表示されます。
          </div>

          <Row className={styles.label}>
            グランドラリーのハッシュタグ設定{" "}
            <span className={styles.required}>必須</span>
          </Row>
          <div className={styles.note}>
            グランドラリーのジャンルやキーワードを設定してください。
          </div>

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

          <div className={styles.noteType2}>
            ※複数のタグを付けるときは、タグごとに「エンター」「改行」を押してください。
          </div>
          {renderPeriodSetting()}
          <Form.Item
            name="game_ids"
            label="所属ラリー登録"
            colon={false}
            className={styles.formItemDefault}
          >
            <Checkbox.Group className={styles.checkboxGroup} disabled>
              <span className={styles.attention}>
                一度登録したラリーの登録を解除することはできません。
              </span>
              {gameSelect?.map(item => (
                <Checkbox value={item.id} key={item.id}>
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Row className={styles.addLink} onClick={showModal}>
            ＋ラリーを追加する
          </Row>

          <Row className={styles.label}>グランドラリーの制覇報酬</Row>
          <Row align="middle">
            <Form.Item
              name="certificate"
              colon={false}
              className={styles.formItem}
            >
              <Radio.Group className={styles.radioGroup} defaultValue={1}>
                <Radio value={1}>賞状画像 (デフォルト)</Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              className={styles.btnCertifi}
              onClick={() => setIsOpenSeriModal(true)}
            >
              賞状を編集
            </Button>
          </Row>
          {renderActions()}
        </Form>
      </div>
      <ModalRallySelection
        visible={visible}
        closeModal={closeModal}
        listGames={listGames}
        onSelectGames={onSelectGames}
        gameSelect={gameSelect}
        selectGameStock={selectGameStock}
      />

      <GrandRallyCertiModal
        initCertificateSeri={initCertificateSeri}
        visible={isOpenSeriModal}
        closeModal={() => setIsOpenSeriModal(false)}
        onFinish={submitGrandCertificate}
        seriesData={form.getFieldsValue()}
      />
    </>
  );
};

export default SeriesInfoForm;
