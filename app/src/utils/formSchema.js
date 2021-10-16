import * as Yup from 'yup';
import { regexPassword } from './regexScehema';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required for registrations'),
  password: Yup.string()
    .required('Password is required for registrations')
    .matches(
      regexPassword,
      'Password must at least 8 characters long with both letters and numbers'
    ),
  retypePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Confirmation is required'),
  firstName: Yup.string().required('First name is required for user accounts'),
  lastName: Yup.string().required('Last name is required for user accounts'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});
