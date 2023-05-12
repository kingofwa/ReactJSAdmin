/* eslint-disable import/no-unresolved */
import React from "react";
import Login from "@components/auth/Login";
import { AuthLayout } from "@layouts";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

LoginPage.layout = DefaultNoTabLayout;

export default LoginPage;
