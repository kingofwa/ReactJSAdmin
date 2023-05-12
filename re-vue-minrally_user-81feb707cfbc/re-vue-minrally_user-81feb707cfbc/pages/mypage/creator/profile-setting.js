import ProfileCreatorSetting from "@components/mypage/Creator/ProfileCreatorSetting";
// import { PrivateLayout } from "@layouts";
import withPrivateRoute from "@routes/withPrivaterRoute";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const ProfileSettingPage = () => {
  return <ProfileCreatorSetting />;
};

ProfileSettingPage.layout = DefaultNoTabLayout;
export default withPrivateRoute(ProfileSettingPage);
