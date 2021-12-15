import { Formik } from 'formik';
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
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
        onSubmit={() => {}}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={styles['register-form']}
          >
            <h1 className={'text-center'}>REGISTER</h1>
            <FormControl isInvalid={!!errors.email && !!touched.email}>
              <FormLabel>Email</FormLabel>
              <Input
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder={'Email'}
                required
              />
              {!!errors.email && !!touched.email && (
                <FormErrorMessage type="invalid">
                  {_.capitalize(errors.email)}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password && !!touched.password}>
              <FormLabel>Password</FormLabel>
              <Input
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder={'Password'}
                type={'password'}
                required
              />
              {!!errors.password && !!touched.password && (
                <FormErrorMessage type="invalid">
                  {_.capitalize(errors.password)}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errors.retypePassword && !!touched.retypePassword}
            >
              <FormLabel>Confirmation Password</FormLabel>
              <Input
                value={values.retypePassword}
                onChange={handleChange('retypePassword')}
                onBlur={handleBlur('retypePassword')}
                placeholder={'Confirmation Password'}
                type={'password'}
                required
              />
              {!!errors.retypePassword && !!touched.retypePassword && (
                <FormErrorMessage type="invalid">
                  {_.capitalize(errors.retypePassword)}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.firstName && !!touched.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                value={values.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder={'First Name'}
                required
              />
              {!!errors.firstName && !!touched.firstName && (
                <FormErrorMessage type="invalid">
                  {_.capitalize(errors.firstName)}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastName && !!touched.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={values.lastName}
                onChange={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder={'Last Name'}
                required
              />
              {!!errors.lastName && !!touched.lastName && (
                <FormErrorMessage type="invalid">
                  {_.capitalize(errors.lastName)}
                </FormErrorMessage>
              )}
            </FormControl>
            <div className={'d-flex justify-content-center'}>
              <Button type={'submit'} className={'mt-3'}>
                Register!
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default RegsiterPage;
