/* eslint-disable import/no-unresolved */
import ErrorServer from "@components/error/500";
import { LayoutBlank } from "@layouts";
import React from "react";

const ErrorServerPage = () => {
  return <ErrorServer />;
};

ErrorServerPage.layout = LayoutBlank;

export default ErrorServerPage;
