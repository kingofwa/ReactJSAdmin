/* eslint-disable import/no-unresolved */
import CreateRallySettingCompleted from "@containers/CreateRallySettingCompletedContainer";
import OnlyFooterLayout from "layouts/only-footer-layout";

const SettingCompletePage = () => {
  return <CreateRallySettingCompleted />;
};

SettingCompletePage.layout = OnlyFooterLayout;

export default SettingCompletePage;
