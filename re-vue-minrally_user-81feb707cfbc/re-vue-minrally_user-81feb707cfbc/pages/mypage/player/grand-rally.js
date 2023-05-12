import GrandRally from "@components/mypage/Player/RallyContainer/GrandRally";
// import { PrivateLayout } from "@layouts";
import withPrivateRoute from "@routes/withPrivaterRoute";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const GrandRallyPage = () => {
  return <GrandRally />;
};

GrandRallyPage.layout = DefaultNoTabLayout;

export default withPrivateRoute(GrandRallyPage);
