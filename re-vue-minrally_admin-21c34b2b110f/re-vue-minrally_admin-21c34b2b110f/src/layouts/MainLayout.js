import React from 'react';
import Header from '@components/Header';
import './styles.scss';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default MainLayout;
