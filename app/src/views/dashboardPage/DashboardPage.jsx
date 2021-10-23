import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { markerSchema } from '../../utils/formSchema';
import _ from 'lodash';
import classnames from 'classnames';
import FileFeedback from '../../components/FileFeedback';

export const DashboardPage = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        width: '',
        marker: {},
        metadata: '',
      }}
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormGroup>
            <FormLabel>Marker Name</FormLabel>
            <FormControl
              isInvalid={!!errors.name && !!touched.name}
              onChange={handleChange('name')}
              placeholder={'Marker Name'}
              onBlur={handleBlur('name')}
              value={values.name}
              required
            />
            {!!errors.name && !!touched.name && (
              <FormControl.Feedback type="invalid">
                {_.capitalize(errors.name)}
              </FormControl.Feedback>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Marker Width</FormLabel>
            <FormControl
              isInvalid={!!errors.width && !!touched.width}
              onChange={handleChange('width')}
              placeholder={'Marker Width'}
              onBlur={handleBlur('width')}
              value={values.width}
              required
            />

            {!!errors.width && !!touched.width && (
              <FormControl.Feedback type="invalid">
                {_.capitalize(errors.width)}
              </FormControl.Feedback>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Marker Image</FormLabel>
            <input
              className={classnames('form-control', {
                'is-invalid': !!errors.marker && !!touched.marker,
              })}
              placeholder={'Marker Image'}
              onBlur={handleBlur('marker')}
              onChange={(e) => {
                values.marker = e.target.files[0];
              }}
              type="file"
              required
            />
            {!!errors.marker && !!touched.marker && (
              <FileFeedback type="invalid">
                {_.capitalize(errors.marker)}
              </FileFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Marker Metadata</FormLabel>
            <FormControl
              isInvalid={!!errors.metadata && !!touched.metadata}
              onChange={handleChange('metadata')}
              placeholder={'Marker Metadata'}
              onBlur={handleBlur('metadata')}
              value={values.metadata}
              as={'textarea'}
            />
            {!!errors.metadata && !!touched.metadata && (
              <FormControl.Feedback type="invalid">
                {_.capitalize(errors.metadata)}
              </FormControl.Feedback>
            )}
          </FormGroup>
          <Button type={'submit'}>Create Marker</Button>
        </Form>
      )}
    </Formik>
  );
};

export default DashboardPage;
