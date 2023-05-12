/* eslint-disable import/no-unresolved */
import CreateRallySpotListContainer from "@containers/CreateRallySpotListContainer";
import RallyCreateLayout from "layouts/rally-create-layout";

const CreateRallySpotListPage = () => {
  return <CreateRallySpotListContainer isEdit />;
};

CreateRallySpotListPage.layout = RallyCreateLayout;

export default CreateRallySpotListPage;
