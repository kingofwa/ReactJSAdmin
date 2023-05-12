/* eslint-disable import/no-unresolved */
import CreateRallySystemSettingContainer from "@containers/CreateRallySystemSettingContainer";
import RallyCreateLayout from "layouts/rally-create-layout";

const SystemRallyPage = () => {
  return <CreateRallySystemSettingContainer />;
};

SystemRallyPage.layout = RallyCreateLayout;

export default SystemRallyPage;
