import React from 'react';
import { Formik } from 'formik';
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { loginSchema } from 'utils/formSchema';
import _ from 'lodash';
import { connect } from 'react-redux';
import { login as _login } from 'store/actions/user';
import { useNavigate } from 'react-router-dom';
import { LoginPageProps, LoginProps } from 'utils/pageInterface';
import { Center, Flex, Text } from '@chakra-ui/react';

const LoginPage: LoginPageProps = ({ login }) => {
  const navigate = useNavigate();

  const loginRequest = async (payload: LoginProps) => {
    try {
      await login(payload);
      navigate('/dashboard', {
        replace: true, // Remove ability to go back
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex height={'100vh'} alignItems={'center'}>
      <Container
        backgroundColor={'telegram.200'}
        pt={10}
        pb={10}
        borderRadius={25}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={loginRequest}
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
              className={'login-form'}
            >
              <Center>
                <Text color={'white'} fontWeight={700}>
                  LOGIN
                </Text>
              </Center>
              <FormControl isInvalid={!!errors.email && !!touched.email} mb={5}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={'Email'}
                  backgroundColor={'white'}
                  required
                />
                {!!errors.email && !!touched.email && (
                  <FormErrorMessage type="invalid">
                    {_.capitalize(errors.email)}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!!errors.password && !!touched.password}
                mb={5}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Password'}
                  type={'password'}
                  backgroundColor={'white'}
                  required
                />
                {!!errors.password && !!touched.password && (
                  <FormErrorMessage type="invalid">
                    {_.capitalize(errors.password)}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Center mt={5}>
                <Button type={'submit'} className={'mt-3'}>
                  Login!
                </Button>
              </Center>
            </form>
          )}
        </Formik>
      </Container>
    </Flex>
  );
};

export default connect(null, {
  login: _login,
  // @ts-ignore
})(LoginPage);
