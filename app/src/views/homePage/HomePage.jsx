import React from 'react';
import { useHistory } from 'react-router';
import Container from 'react-bootstrap/Container';
import { isAuthenticated } from '../../utils/user';

const HomePage = () => {
  const history = useHistory();

  if (isAuthenticated) {
    history.push('/dashboard');

    return null;
  }

  return <Container>Welcome!</Container>;
};

export default HomePage;
