import React from 'react';
import TopBar from './TopBar';

const LoggedInContainer = ({ children }) => {
  return (
    <React.Fragment>
      <TopBar />
      {children}
    </React.Fragment>
  );
};

export default LoggedInContainer;
