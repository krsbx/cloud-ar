import React from 'react';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { registerSchema } from 'utils/formSchema';
import _ from 'lodash';
import styles from './RegisterPage.module.scss';

const RegsiterPage = () => {
  return (
    <Container className={styles['register-container']}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          retypePassword: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={registerSchema}
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
            className={styles['register-form']}
          >
            <h1 className={'text-center'}>REGISTER</h1>
            <FormGroup>
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
            <FormGroup className={'mt-2'}>
              <FormLabel>Confirmation Password</FormLabel>
              <FormControl
                value={values.retypePassword}
                onChange={handleChange('retypePassword')}
                onBlur={handleBlur('retypePassword')}
                placeholder={'Confirmation Password'}
                type={'password'}
                isInvalid={!!errors.retypePassword && !!touched.retypePassword}
                required
              />
              {!!errors.retypePassword && !!touched.retypePassword && (
                <FormControl.Feedback type="invalid">
                  {_.capitalize(errors.retypePassword)}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className={'mt-2'}>
              <FormLabel>First Name</FormLabel>
              <FormControl
                value={values.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder={'First Name'}
                isInvalid={!!errors.firstName && !!touched.firstName}
                required
              />
              {!!errors.firstName && !!touched.firstName && (
                <FormControl.Feedback type="invalid">
                  {_.capitalize(errors.firstName)}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className={'mt-2'}>
              <FormLabel>Last Name</FormLabel>
              <FormControl
                value={values.lastName}
                onChange={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder={'Last Name'}
                isInvalid={!!errors.lastName && !!touched.lastName}
                required
              />
              {!!errors.lastName && !!touched.lastName && (
                <FormControl.Feedback type="invalid">
                  {_.capitalize(errors.lastName)}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <div className={'d-flex justify-content-center'}>
              <Button type={'submit'} className={'mt-3'}>
                Register!
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegsiterPage;
