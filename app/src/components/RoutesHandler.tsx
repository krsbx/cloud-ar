import React from 'react';
import { Route } from 'react-router-dom';
import { IRoutes } from 'utils/routes/routesInterface';
import PublicContainer from './PublicContainer';
import ProtectedContainer from './ProtectedContainer';
import PrivateContainer from './PrivateContainer';

const RoutesHandler = (routes: IRoutes[], isLogin: string, isPublic = true) => {
  return routes.map(({ component: Component, path }) => (
    <Route
      path={path}
      key={path}
      element={
        isPublic ? (
          <PublicContainer isLogin={isLogin}>
            <Component />
          </PublicContainer>
        ) : (
          <ProtectedContainer isLogin={isLogin}>
            <PrivateContainer>
              <Component />
            </PrivateContainer>
          </ProtectedContainer>
        )
      }
    />
  ));
};

export default RoutesHandler;
