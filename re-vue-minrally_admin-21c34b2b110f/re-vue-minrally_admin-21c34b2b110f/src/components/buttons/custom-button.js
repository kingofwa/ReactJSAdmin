import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const CustomButton = ({ className = '', disabled = false, ...rest }) => {
  return (
    <Button
      type="primary"
      className={`btn-custom ${className}`}
      {...rest}
      disabled={disabled}
    />
  );
};

export default CustomButton;
