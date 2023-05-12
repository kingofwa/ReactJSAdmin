/* eslint-disable import/no-unresolved */
import NotAuthorized from "@components/error/401";
import { LayoutBlank } from "@layouts";
import React from "react";

const NotAuthorizedPage = () => {
  return <NotAuthorized />;
};

NotAuthorizedPage.layout = LayoutBlank;

export default NotAuthorizedPage;
