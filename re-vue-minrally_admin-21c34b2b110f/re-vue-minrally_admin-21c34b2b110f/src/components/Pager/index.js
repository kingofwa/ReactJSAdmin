import React from 'react';
import { Pagination } from 'antd';
import './index.scss';

const Pager = ({ onChange, ...rest }) => {
  const itemRender = (_, type, originalElement) => {
    switch (type) {
      case 'prev':
        return <span>＜前へ</span>;
      case 'next':
        return <span>次へ＞</span>;
      default:
        return originalElement;
    }
  };
  if (rest?.total > 0) {
    return (
      <Pagination
        {...rest}
        onChange={onChange}
        itemRender={itemRender}
        showSizeChanger={false}
        className="custom-pagination"
      />
    );
  }
  return null;
};

export default Pager;
