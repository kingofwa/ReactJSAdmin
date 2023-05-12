/* eslint-disable import/no-unresolved */
import CreateRallyEditSystemSettingContainer from "@containers/CreateRallyEditSystemSettingContainer";
import RallyCreateLayout from "layouts/rally-create-layout";

const EditSystemRallyPage = () => {
  return <CreateRallyEditSystemSettingContainer />;
};

EditSystemRallyPage.layout = RallyCreateLayout;

export default EditSystemRallyPage;
