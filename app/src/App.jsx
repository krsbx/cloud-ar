import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import NotFoundPage from './views/NotFoundPage';
import HomePage from './views/homePage/HomePage';
import LoginPage from './views/loginPage/LoginPage';
import RegsiterPage from './views/registerPage/RegisterPage';
import DashboardPage from './views/dashboardPage/DashboardPage';
import PrivateContainer from './components/PrivateContainer';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegsiterPage} />
          <PrivateContainer>
            <Route path="/dashboard" component={DashboardPage} />
          </PrivateContainer>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
