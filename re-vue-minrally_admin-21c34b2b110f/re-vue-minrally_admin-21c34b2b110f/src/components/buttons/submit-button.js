import React from 'react';
import CustomButton from '@components/buttons/custom-button';

const SubmitButton = ({ text, subText, ...rest }) => {
  return (
    <CustomButton type="primary" htmlType="submit" size="large" {...rest}>
      {text}
      {subText && <div>{subText}</div>}
    </CustomButton>
  );
};

export default SubmitButton;
