import { Spin } from "antd";
import React, { useState } from "react";

export const LoaderContext = React.createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const showLoadingAnim = () => setLoading(true);
  const hideLoadingAnim = () => setLoading(false);

  return (
    <LoaderContext.Provider
      value={{ loading, showLoadingAnim, hideLoadingAnim }}
    >
      <Spin spinning={loading}>{children}</Spin>
    </LoaderContext.Provider>
  );
};
