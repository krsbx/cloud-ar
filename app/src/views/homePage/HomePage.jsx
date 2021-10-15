import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { isAuthenticated } from '../../utils/user';
import './HomePage.scss';

const HomePage = () => {
  const history = useHistory();

  if (isAuthenticated) {
    history.push('/dashboard');

    return null;
  }

  return (
    <Container className={'home-container'}>
      <div className={'home-selections'}>
        <h1 className={'text-center'}>Home</h1>
        <div className={'mt-3'}>Already have an account?</div>
        <Link to={'/login'}>Log In</Link>
        <div className={'mt-4'}>Don't have an account?</div>
        <Link to={'/register'}>Register</Link>
      </div>
    </Container>
  );
};

export default HomePage;
