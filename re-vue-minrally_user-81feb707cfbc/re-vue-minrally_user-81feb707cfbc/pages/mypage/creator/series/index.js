/* eslint-disable import/no-unresolved */
import CreateSeriesContainer from "@containers/CreateSeriesContainer/CreateSeriesContainer";
import OnlyFooterLayout from "layouts/only-footer-layout";

const CreateSeriesPage = () => {
  return <CreateSeriesContainer />;
};

CreateSeriesPage.layout = OnlyFooterLayout;

export default CreateSeriesPage;
