/* eslint-disable no-unused-expressions */
import PATHS from "@config/paths";
import { Steps } from "antd";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

const { Step } = Steps;

const RallySteps = ({ current, isPublished, rallyId }) => {
  const router = useRouter();
  const customDot = (dot, { status }) => (
    <>
      {status === "process" && <div className={styles.process}> </div>}
      {status === "finish" && (
        <div className={styles.finish}>
          <img src="/icons/ic-check-white.png" alt="ic-check" />{" "}
        </div>
      )}
    </>
  );

  const onChangeStep = step => {
    if (isPublished && rallyId) {
      let url = "";
      switch (step) {
        case 1:
          url = PATHS.rallyEditInfo.replace(/:rallyId/, rallyId);
          break;
        case 2:
          url = PATHS.rallyEditSpotList.replace(/:rallyId/, rallyId);
          break;
        case 3:
          url = PATHS.rallyCreateEditSystemSetting.replace(/:rallyId/, rallyId);
          break;
        // case 4:
        //   url = PATHS.rallyCreatePublicCompleted.replace(/:rallyId/, rallyId);
        //   break;
        default:
      }
      router.push(url);
    }
  };

  return (
    <>
      <Steps
        current={current}
        progressDot={customDot}
        className={styles.steps}
        responsive={false}
      >
        <Step title="ラリー情報" onClick={() => onChangeStep(1)} />
        <Step title="スポット情報" onClick={() => onChangeStep(2)} />
        <Step title="システム設定" onClick={() => onChangeStep(3)} />
        <Step title="確認" />
      </Steps>
    </>
  );
};

export default RallySteps;
