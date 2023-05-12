/* eslint-disable import/no-unresolved */
import { CustomButton } from "@components/common/buttons";
import HeaderBack from "@components/common/header/HeaderBack";
import { Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { getRallyInfo } from "@components/RallyCreate/service";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import ImageFallback from "@components/common/ImageFallback";
import ModalShare from "./ModalShare";
import styles from "./styles.module.scss";

const ReleaseCompleted = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const rallyId = router?.query?.rallyId;
  const [rallyInfo, setRallyInfo] = useState();
  const isEdit = router?.query?.isEdit === "true";
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setVisible(!visible);
  };

  const closeModal = () => {
    setVisible(!visible);
  };

  const fetchRallyInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getRallyInfo(rallyId);
      setRallyInfo(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchRallyInfo();
    }
  }, [rallyId]);

  const urlShare = `${process.env.NEXT_PUBLIC_APP_HOST}${PATHS.rally}/${rallyId}`;

  return (
    <Spin spinning={isLoading}>
      <div className={styles.releaseCompleted}>
        <HeaderBack title={isEdit ? "ラリー編集" : "ラリー作成"} />
        <Row justify="center" className={styles.title}>
          お疲れ様です！ラリーが公開されました！
        </Row>
        <Row justify="center" className={styles.name}>
          {rallyInfo?.name}
        </Row>
        <Row justify="center">
          <div className={styles.img}>
            <ImageFallback
              src={rallyInfo?.top_photo_url || rallyInfo?.google_image_url}
              alt="rally-img"
              isLoading={isLoading}
            />
          </div>

          {/* {renderPhoto()} */}
        </Row>
        <Row justify="center" className={styles.description}>
          早速SNSへシェアして <br /> ラリーの開始を告知してみましょう！
        </Row>
        <div className={styles.btnGroup}>
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            onClick={openModal}
            variant="community"
          >
            <img src="/icons/ic-share-white.png" alt="icon-share" />
            ラリーをシェア
          </CustomButton>
          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={() => router.push(PATHS.mypageCreator)}
          >
            マイページへ戻る
          </CustomButton>
        </div>
        <ModalShare
          visible={visible}
          onClose={closeModal}
          urlShare={urlShare}
        />
      </div>
    </Spin>
  );
};

export default ReleaseCompleted;
