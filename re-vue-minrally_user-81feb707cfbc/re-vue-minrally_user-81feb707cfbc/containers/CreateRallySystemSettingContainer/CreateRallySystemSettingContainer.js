// eslint-disable-next-line import/no-unresolved
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import { getRallyInfo } from "@components/RallyCreate/service";
import SystemSettingForm from "@components/RallyCreate/SystemSetting/SystemSettingForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateRallySystemSettingContainer = () => {
  const router = useRouter();
  const rallyId = router?.query?.rallyId;
  const [rallyInfo, setRallyInfo] = useState();

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

  return (
    <di>
      <HeaderBack title="ラリー作成" />
      <div className="create-rally-detail-container">
        <RallySteps current={2} />
        <RallyTitle content="システム設定" />
        <SystemSettingForm rallyInfo={rallyInfo} />
      </div>
    </di>
  );
};

export default CreateRallySystemSettingContainer;
