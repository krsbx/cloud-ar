import React from 'react';
import TopBar from './TopBar';

const PrivateContainer: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <TopBar />
      {children}
    </React.Fragment>
  );
};

export default PrivateContainer;
