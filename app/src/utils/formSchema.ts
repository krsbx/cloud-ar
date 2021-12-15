import * as Yup from 'yup';
import validator from './validator';
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

export const markerSchema = Yup.object().shape({
  name: Yup.string().required('Marker name is required for identifying'),
  width: Yup.string()
    .required('Marker width is required for generating marker')
    .test('markerWidth', 'Marker width must a number', (width) =>
      validator.isNumber(width)
    ),
  marker: Yup.mixed()
    .required('Marker image is required for scanning')
    .test('marker', 'Marker image is not valid', (marker: File) =>
      validator.isImage(marker)
    ),
  metadata: Yup.string().test(
    'markerMetadata',
    'Metadata is not a valid JSON object',
    (metadata) => validator.isJson(metadata, true)
  ),
});
