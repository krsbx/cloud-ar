import React from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const RoutesHandler = ({ routes }) => {
  return (
    <Switch>
      <Suspense fallback={<>Loading...</>}>
        {routes.map(({ component: Component, path, exact }) => (
          <Route exact={exact} path={path} key={path} component={Component} />
        ))}
      </Suspense>
    </Switch>
  );
};

export default RoutesHandler;
