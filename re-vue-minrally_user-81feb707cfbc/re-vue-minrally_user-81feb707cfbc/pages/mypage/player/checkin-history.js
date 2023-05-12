/* eslint-disable import/no-unresolved */
import CheckinHistory from "@components/mypage/Player/CheckinHistory";
// import { PrivateLayout } from "@layouts";
import withPrivateRoute from "@routes/withPrivaterRoute";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const CheckinHistoryPage = () => {
  return <CheckinHistory />;
};

CheckinHistoryPage.layout = DefaultNoTabLayout;
export default withPrivateRoute(CheckinHistoryPage);
