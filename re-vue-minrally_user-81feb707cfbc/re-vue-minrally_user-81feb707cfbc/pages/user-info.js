/* eslint-disable import/no-unresolved */
import UserInfo from "@components/auth/UserInfo";
import { AuthLayout } from "@layouts";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const UserInfoPage = () => {
  return (
    <AuthLayout>
      <UserInfo isRegister />
    </AuthLayout>
  );
};

UserInfoPage.layout = DefaultNoTabLayout;

export default UserInfoPage;
