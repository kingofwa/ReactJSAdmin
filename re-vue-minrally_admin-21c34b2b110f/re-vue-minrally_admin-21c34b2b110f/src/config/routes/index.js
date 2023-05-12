import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import { BUSINESS_ROUTES, ROUTES } from './routes';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../constants';

const Routes = () => {
  const { credentials } = useSelector(state => state.user);
  const isBusiness = credentials?.role === USER_ROLE.BUSINESS;

  if (isBusiness) {
    return (
      <Switch>
        {BUSINESS_ROUTES.map((route, i) => (
          <AppRoute key={i} {...route} />
        ))}
      </Switch>
    );
  }

  return (
    <Switch>
      {ROUTES.map((route, i) => (
        <AppRoute key={i} {...route} />
      ))}
    </Switch>
  );
};

export default Routes;
