/* eslint-disable import/no-unresolved */
import CreateRallySpotDetailContainer from "@containers/CreateRallySpotDetailContainer";
import RallyCreateLayout from "layouts/rally-create-layout";

const CreateRallySpotListPage = () => {
  return <CreateRallySpotDetailContainer />;
};

CreateRallySpotListPage.layout = RallyCreateLayout;

export default CreateRallySpotListPage;
