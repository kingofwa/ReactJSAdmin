import FollowerUserById from "@components/mypage/Player/FollowerUserById";
import { MainLayout } from "@layouts";
// import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const FollowerUserPage = () => {
  return <FollowerUserById />;
};

FollowerUserPage.layout = MainLayout;
export default FollowerUserPage;
