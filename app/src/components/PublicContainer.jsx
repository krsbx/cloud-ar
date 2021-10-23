import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicContainer = ({ children, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (!isLogin ? children : <Redirect to="/dashboard" />)}
    />
  );
};

export default PublicContainer;
