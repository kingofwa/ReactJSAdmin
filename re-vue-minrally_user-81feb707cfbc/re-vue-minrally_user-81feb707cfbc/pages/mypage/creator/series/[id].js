/* eslint-disable import/no-unresolved */
import EditSeriesContainer from "@containers/EditSeriesContainer/EditSeriesContainer";
import OnlyFooterLayout from "layouts/only-footer-layout";

const SeriesEditingPage = () => {
  return <EditSeriesContainer />;
};

SeriesEditingPage.layout = OnlyFooterLayout;

export default SeriesEditingPage;
