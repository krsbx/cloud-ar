import React from 'react';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import _ from 'lodash';
import './LoginPage.scss';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  return (
    <Container className={'login-container'}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={'login-form'}
          >
            <FormGroup>
              <h1 className={'text-center'}>LOGIN</h1>
              <FormLabel>Email</FormLabel>
              <FormControl
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder={'Email'}
                isInvalid={!!errors.email && !!touched.email}
                required
              />
              {!!errors.email && !!touched.email && (
                <FormControl.Feedback type="invalid">
                  {_.capitalize(errors.email)}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className={'mt-2'}>
              <FormLabel>Password</FormLabel>
              <FormControl
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder={'Password'}
                type={'password'}
                isInvalid={!!errors.password && !!touched.password}
                required
              />
              {!!errors.password && !!touched.password && (
                <FormControl.Feedback type="invalid">
                  {_.capitalize(errors.password)}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <div className={'d-flex justify-content-center'}>
              <Button type={'submit'} className={'mt-3'}>
                Login!
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;