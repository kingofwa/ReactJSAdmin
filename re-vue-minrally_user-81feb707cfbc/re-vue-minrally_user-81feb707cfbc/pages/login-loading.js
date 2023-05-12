/* eslint-disable import/no-unresolved */
import React from "react";
import { AuthLayout } from "@layouts";
import LoginLoading from "@components/auth/LoginLoading";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginLoading />
    </AuthLayout>
  );
};

LoginPage.layout = DefaultNoTabLayout;

export default LoginPage;
