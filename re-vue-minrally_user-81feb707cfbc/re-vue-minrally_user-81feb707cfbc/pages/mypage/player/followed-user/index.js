import FollowedUser from "@components/mypage/Player/FollowedUser";
import { MainLayout } from "@layouts";
// import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const FollowedUserPage = () => {
  return <FollowedUser />;
};

FollowedUserPage.layout = MainLayout;

export default FollowedUserPage;
