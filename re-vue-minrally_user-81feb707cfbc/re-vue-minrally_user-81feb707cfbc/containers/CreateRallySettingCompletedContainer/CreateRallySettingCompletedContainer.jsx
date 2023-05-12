/* eslint-disable no-irregular-whitespace */
/* eslint-disable import/no-unresolved */
import { CustomButton } from "@components/common/buttons";
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import { GetPreviewGame, publishGame } from "@components/RallyCreate/service";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { MESSAGE_DURATION, STATUS_RESPONSE } from "@utils/constants";
import { message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MESSAGES } from "@config/messages";
import PreviewModal from "./PreviewModal";
import styles from "./styles.module.scss";

const SettingCompleted = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const isEdit = router?.query?.isEdit === "true";

  const rallyId = router?.query?.rallyId;

  const getPreviewGame = id => {
    showLoadingAnim();
    GetPreviewGame(id)
      .then(
        res => res.status === STATUS_RESPONSE.success && setPreview(res?.data)
      )
      .finally(hideLoadingAnim());
  };

  const handlePublishGame = async () => {
    try {
      showLoadingAnim();
      if (rallyId) {
        await publishGame(rallyId);
        const urlPublicComplete = `${PATHS.rallyCreatePublicCompleted.replace(
          /:rallyId/,
          rallyId
        )}?isEdit=${isEdit}`;
        message.success({
          content: MESSAGES.publicSuccess,
          duration: MESSAGE_DURATION
        });
        router.push(urlPublicComplete);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (rallyId) getPreviewGame(rallyId);
  }, [rallyId]);

  const showPreview = () => {
    setVisible(true);
  };

  const closePreview = () => {
    setVisible(false);
  };

  const onSaveDraft = () => {
    message.success({
      content: MESSAGES.saveDraft,
      duration: MESSAGE_DURATION
    });
    router.push(PATHS.mypageCreator);
  };

  return (
    <div>
      <HeaderBack title={isEdit ? "ラリー編集" : "ラリー作成"} />
      <div className={styles.container}>
        <RallySteps current={3} />

        <div className={styles.banner}>設定完了！</div>
        <CustomButton
          className={styles.btnPreview}
          onClick={showPreview}
          variant="community"
        >
          ラリーページをプレビューする
        </CustomButton>
        <div className={styles.content}>
          <div className={styles.label}>ラリー公開の注意事項</div>
          <div className={styles.note}>
            ※ラリーを公開すると、ラリーを削除することはできません。
            <br />
            ※公開後のスポット情報の変更は新たなバージョンが作成されます。
            <br />
            　バージョンアップ機能を現在開発中です。
            <br />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            variant="community"
            onClick={handlePublishGame}
          >
            ラリーを公開する
          </CustomButton>
          {isEdit ? (
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={() =>
                router.push(PATHS.rallyEditInfo.replace(/:rallyId/, rallyId))
              }
            >
              再編集する
            </CustomButton>
          ) : (
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={onSaveDraft}
            >
              下書き保存
            </CustomButton>
          )}
        </div>
      </div>
      <PreviewModal
        visible={visible}
        closePreview={closePreview}
        preview={preview}
      />
    </div>
  );
};

export default SettingCompleted;
