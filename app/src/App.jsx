import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import NotFoundPage from './views/NotFoundPage';
import HomePage from './views/homePage/HomePage';
import RegsiterPage from './views/registerPage/RegisterPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={RegsiterPage} />
        <Route path="/register" component={RegsiterPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
