// eslint-disable-next-line import/no-unresolved
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import { getRallyInfo } from "@components/RallyCreate/service";
import SystemSettingForm from "@components/RallyCreate/SystemSetting/SystemSettingForm";
import { RALLY_STATUS } from "@config/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateRallyEditSystemSettingContainer = () => {
  const router = useRouter();
  const rallyId = router?.query?.rallyId;
  const [rallyInfo, setRallyInfo] = useState({});

  const fetchRallyInfo = async () => {
    try {
      const response = await getRallyInfo(rallyId);
      setRallyInfo(response);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchRallyInfo();
    }
  }, [rallyId]);

  const isPublished = rallyInfo?.status === RALLY_STATUS.PUBLISHED;

  return (
    <>
      <HeaderBack title="ラリー編集" />
      <div className="create-rally-detail-container">
        <RallySteps current={2} isPublished={isPublished} rallyId={rallyId} />
        <RallyTitle content="システム設定" />
        <SystemSettingForm isEdit rallyInfo={rallyInfo} />
      </div>
    </>
  );
};

export default CreateRallyEditSystemSettingContainer;
