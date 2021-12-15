import { Formik } from 'formik';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { markerSchema } from 'utils/formSchema';
import _ from 'lodash';
import classnames from 'classnames';

export const DashboardPage = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        width: '',
        marker: {},
        metadata: '',
      }}
      onSubmit={() => {}}
      validationSchema={markerSchema}
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
        >
          <FormControl isInvalid={!!errors.name && !!touched.name}>
            <FormLabel>Marker Name</FormLabel>
            <Input
              onChange={handleChange('name')}
              placeholder={'Marker Name'}
              onBlur={handleBlur('name')}
              value={values.name}
              required
            />
            {!!errors.name && !!touched.name && (
              <FormErrorMessage type="invalid">
                {_.capitalize(errors.name)}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.width && !!touched.width}>
            <FormLabel>Marker Width</FormLabel>
            <Input
              onChange={handleChange('width')}
              placeholder={'Marker Width'}
              onBlur={handleBlur('width')}
              value={values.width}
              required
            />
            {!!errors.width && !!touched.width && (
              <FormErrorMessage type="invalid">
                {_.capitalize(errors.width)}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.marker && !!touched.marker}>
            <FormLabel>Marker Image</FormLabel>
            <input
              className={classnames('form-control', {
                'is-invalid': !!errors.marker && !!touched.marker,
              })}
              placeholder={'Marker Image'}
              onBlur={handleBlur('marker')}
              onChange={(e) => {
                values.marker = e.target.files![0];
              }}
              type="file"
              required
            />
            {/* {!!errors.marker && !!touched.marker && _.capitalize(errors.marker)} */}
          </FormControl>
          <FormControl isInvalid={!!errors.metadata && !!touched.metadata}>
            <FormLabel>Marker Metadata</FormLabel>
            <Textarea
              onChange={handleChange('metadata')}
              placeholder={'Marker Metadata'}
              onBlur={handleBlur('metadata')}
              value={values.metadata}
            />
            {!!errors.metadata && !!touched.metadata && (
              <FormErrorMessage type="invalid">
                {_.capitalize(errors.metadata)}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button type={'submit'}>Create Marker</Button>
        </form>
      )}
    </Formik>
  );
};

export default DashboardPage;
