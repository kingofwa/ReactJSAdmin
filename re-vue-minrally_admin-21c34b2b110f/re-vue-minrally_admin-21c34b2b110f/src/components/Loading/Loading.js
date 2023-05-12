import React from 'react';
import { Spin } from 'antd';
import './styles.scss';

const Loading = () => {
  return (
    <div className="loading">
      <Spin spinning className="loading__spinner" />
    </div>
  );
};

export default Loading;
