import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getResource } from 'store/selectors/resources';
import { RESOURCE_NAME } from 'store/reducers/resources';

const ProtectedContainer = ({ children, isLogin, storage, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        storage['access'] || isLogin ? children : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  storage: getResource(RESOURCE_NAME.STORAGE)(state),
});

export default connect(mapStateToProps)(ProtectedContainer);
