import Rally from "@components/mypage/Player/RallyContainer/Rally";
// import { PrivateLayout } from "@layouts";
import withPrivateRoute from "@routes/withPrivaterRoute";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const RallyPage = () => {
  return <Rally />;
};

// RallyPage.layout = PrivateLayout;

RallyPage.layout = DefaultNoTabLayout;
export default withPrivateRoute(RallyPage);
