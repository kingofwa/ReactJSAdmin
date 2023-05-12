import FollowerUser from "@components/mypage/Player/FollowerUser";
import { MainLayout } from "@layouts";
// import { PrivateLayout } from "@layouts";
// import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const FollowerPage = () => {
  return <FollowerUser />;
};

// FollowerPage.layout = PrivateLayout;
FollowerPage.layout = MainLayout;
export default FollowerPage;
