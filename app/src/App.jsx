import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'App.scss';
import RoutesHandler from 'components/RoutesHandler';
import publicRoutes from 'utils/routes/public';
import privateRoutes from 'utils/routes/private';
import PublicContainer from 'components/PublicContainer';
import ProtectedContainer from 'components/ProtectedContainer';
import PrivateContainer from 'components/PrivateContainer';
import useLocalStorage from 'utils/useLocalStorage';

const App = () => {
  const [isLogin] = useLocalStorage();

  return (
    <Router>
      <Switch>
        <React.Fragment>
          <PublicContainer isLogin={!!isLogin}>
            <RoutesHandler routes={publicRoutes} />
          </PublicContainer>
          <ProtectedContainer path="/" isLogin={!!isLogin}>
            <PrivateContainer>
              <RoutesHandler routes={privateRoutes} />
            </PrivateContainer>
          </ProtectedContainer>
        </React.Fragment>
      </Switch>
    </Router>
  );
};

export default App;
