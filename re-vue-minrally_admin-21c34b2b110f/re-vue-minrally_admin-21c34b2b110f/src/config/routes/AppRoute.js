import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATHS } from '../paths';

const AppRoute = ({
  component: Component,
  layout: Layout,
  private: Private,
  title: Title,
  ...rest
}) => {
  const { isLogin } = useSelector(state => state.user);
  const isRedirect = Private ? !isLogin : false;

  return (
    <Route
      {...rest}
      render={props => {
        return isRedirect ? (
          <Redirect to={{ pathname: PATHS.login }} />
        ) : (
          <Layout title={Title}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
