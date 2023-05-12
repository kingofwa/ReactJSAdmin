/* eslint-disable import/no-unresolved */
import React from "react";
import { AuthLayout } from "@layouts";
import Signup from "@components/auth/Signup";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const SignupPage = () => {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
};

SignupPage.layout = DefaultNoTabLayout;

export default SignupPage;
