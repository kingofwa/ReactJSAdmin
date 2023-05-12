import { CaretDownOutlined } from "@ant-design/icons";
import { CustomButton } from "@components/common/buttons";
import AboutGrandModal from "@components/common/modal/AboutGrandModal";
import { getCertificateRally, getUserGames } from "@components/mypage/service";
import { RALLY_STATUS } from "@config/constants";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import {
  DEFAULT_TEMPLATE_CERTIFICATE,
  MESSAGE_DURATION
} from "@utils/constants";
import { goToView } from "@utils/go-to-view";
import { Button, Checkbox, Form, message, Row, Select } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MESSAGES } from "@config/messages";
import { CreateSeriesSetup, GetListSeries } from "../service";
import RallyCertiModal from "./RallyCertiModal";
import styles from "./styles.module.scss";

const SystemSettingForm = ({ isEdit = false, rallyInfo }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [series, setSeries] = useState([]);
  const [isOpenRallyModal, setIsOpenRallyModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [certificate, setCertificate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRallyPublic, setIsRallyPublic] = useState();
  const [isFirstRally, setIsFirstRally] = useState(true);
  const [showAboutGrand, setShowAboutGrand] = useState(false);
  const [disabledSerie, setDisabledSerie] = useState(false);

  const rallyId = router?.query?.rallyId;

  const fetchSeries = async () => {
    try {
      const seriesData = await GetListSeries();
      setSeries(seriesData);
    } catch (error) {
      //
    }
  };

  const fetchCertificate = async () => {
    try {
      const certificateResponse = await getCertificateRally(rallyId);
      const certificateData = {
        name:
          certificateResponse?.data?.name ?? DEFAULT_TEMPLATE_CERTIFICATE.name,
        description:
          certificateResponse?.data?.description ??
          DEFAULT_TEMPLATE_CERTIFICATE.description
      };
      setCertificate(certificateData);
    } catch (error) {
      //
    }
  };

  // const fetchRallyInfo = async () => {
  //   try {
  //     const rallyInfo = await getRallyInfo(rallyId);
  //     const serieId = rallyInfo?.serie?.id;
  //     setIsRallyPublic(rallyInfo?.status !== RALLY_STATUS.draft);
  //     form.setFieldsValue({ serie_id: serieId });
  //   } catch (error) {
  //     //
  //   }
  // };

  useEffect(() => {
    const serieId = rallyInfo?.serie?.id;
    const isPublic = rallyInfo?.status === RALLY_STATUS.PUBLISHED;
    setIsRallyPublic(isPublic);
    form.setFieldsValue({ serie_id: serieId });
    if (serieId) {
      setDisabledSerie(true);
    } else {
      setDisabledSerie(false);
    }
  }, [rallyInfo]);

  const fetchUserGames = async () => {
    const params = { page: 1, per: 5 };
    const response = await getUserGames(params);
    const games = response?.data;
    setIsFirstRally(size(games) < 2);
  };

  const getInitData = async () => {
    try {
      setIsLoading(true);
      showLoadingAnim();
      if (rallyId) {
        await fetchSeries();
        await fetchCertificate();
        // await fetchRallyInfo();
        await fetchUserGames();
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
      setIsLoading(false);
    }
  };

  const onFinish = async values => {
    try {
      showLoadingAnim();
      const params = {
        serie_id: values?.serie_id,
        certificate_image_template_attributes: certificate
      };
      await CreateSeriesSetup(rallyId, params);
      if (isDraft) {
        message.success({
          content: MESSAGES.saveDraft,
          duration: MESSAGE_DURATION
        });
        router.push(PATHS.mypageCreator);
      } else {
        const settingCompleteUrl = `${PATHS.rallyCreateSettingCompleted.replace(
          /:rallyId/,
          rallyId
        )}?isEdit=${isEdit}`;
        if (!isRallyPublic) {
          router.push(settingCompleteUrl);
        } else {
          const urlPublicComplete = `${PATHS.rallyCreatePublicCompleted.replace(
            /:rallyId/,
            rallyId
          )}?isEdit=${isEdit}`;
          router.push(urlPublicComplete);
        }
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const onFinishFailed = error => {
    const idElement = `form-info_${error?.errorFields[0]?.name[0]}`;
    goToView(idElement);
  };

  useEffect(() => {
    getInitData();
  }, [rallyId]);

  // console.log("rallyInfo: ", rallyInfo);

  const renderSeries = () => {
    if (!isLoading) {
      return (
        <>
          <Row className={styles.label}>
            グランドラリー設定
            <span onClick={() => setShowAboutGrand(true)}>
              <img
                src="/icons/ic-info.svg"
                alt="ic-info"
                className={styles.icInfo}
              />
            </span>
          </Row>

          <AboutGrandModal
            visible={showAboutGrand}
            hideModal={() => setShowAboutGrand(false)}
          />

          {isFirstRally ? (
            <div className={styles.note}>
              作成したラリーをグランドラリーに付属させる機能です。
              <br />
              スポット数の多いラリーを作成する際はこちらの機能をご利用ください。
              <br />
              ※グランドラリーは作成したラリーが2つ以上の場合に作成・設定が可能です。
            </div>
          ) : (
            <div className={styles.note}>
              作成したラリーをグランドラリーに付属させる機能です。
              <br />
              スポット数の多いラリーを作成する際はこちらの機能をご利用ください。
            </div>
          )}
          <div className={styles.attention}>
            一度グランドラリーを設定すると解除することはできません。
          </div>
          {!isFirstRally && (
            <Form.Item className={styles.formItemDefault} name="serie_id">
              <Select
                placeholder="選択してください"
                className={styles.select}
                suffixIcon={<CaretDownOutlined className="ant-select-suffix" />}
                disabled={disabledSerie}
              >
                {series?.map(item => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name ?? "No name"}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </>
      );
    }
    return null;
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
            htmlType="submit"
            className={styles.btnSubmit}
            variant="community"
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
      <>
        <Form.Item className={styles.formItemBtn}>
          <CustomButton
            type="primary"
            htmlType="submit"
            className={styles.btnSubmit}
            variant="community"
            onClick={() => setIsDraft(false)}
          >
            確認へ進む
          </CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={() => setIsDraft(true)}
          >
            下書き保存
          </CustomButton>
        </Form.Item>
      </>
    );
  };
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        name="form-info"
        className={styles.formWrapper}
        onFinishFailed={onFinishFailed}
        initialValues={{ completion_reward: false, certificate: true }}
      >
        <Row className={styles.label}>
          ラリー制覇報酬 <span className={styles.required}>必須</span>
        </Row>
        <div className={styles.note}>
          ※現在はデフォルトの賞状のみが設定できます。
        </div>
        <Row className={styles.checkWrap}>
          <Form.Item
            name="certificate"
            className={styles.formItem}
            valuePropName="checked"
          >
            <Checkbox>賞状画像 (デフォルト)</Checkbox>
          </Form.Item>

          {rallyId && (
            <span
              onClick={() => setIsOpenRallyModal(true)}
              className={styles.btnLink}
            >
              賞状を編集
            </span>
          )}
        </Row>

        {renderSeries()}

        {!isFirstRally && !rallyInfo?.serie?.id && (
          <Button
            className={styles.addSerie}
            onClick={() =>
              router.push(
                `${PATHS.createSeri}?redirectTo=${router.asPath}&isRallyEdit=${isEdit}`
              )
            }
          >
            ＋ 新しいグランドラリーを作成
          </Button>
        )}

        {renderActions()}
      </Form>

      <RallyCertiModal
        visible={isOpenRallyModal}
        closeModal={() => setIsOpenRallyModal(false)}
        certificate={certificate}
        setCertificate={setCertificate}
        rallyInfo={rallyInfo}
      />
    </div>
  );
};

export default SystemSettingForm;
