import ProfilePlayerSetting from "@components/mypage/Player/ProfilePlayerSetting";
import withPrivateRoute from "@routes/withPrivaterRoute";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const ProfileSettingPage = () => {
  return <ProfilePlayerSetting />;
};

ProfileSettingPage.layout = DefaultNoTabLayout;
export default withPrivateRoute(ProfileSettingPage);
