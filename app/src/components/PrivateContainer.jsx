import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import TopBar from './TopBar';
import { getAllData as _getAllData } from '../store/actions/resources';
import { getUserData as _getUserData } from '../store/actions/user';
import { getCurrentUser } from '../store/selectors/user';
import { connect } from 'react-redux';
import { RESOURCE_NAME } from '../store/reducers/resources';
import { isAuthenticated, checkExpires } from '../utils/user';

const PrivateContainer = ({ children, getAllData, getUserData, user }) => {
  const history = useHistory();

  if (!checkExpires()) {
    history.push('/');
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
      getAllData(RESOURCE_NAME.MARKERS, 'limit=all');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user.isAdmin) getAllData(RESOURCE_NAME.USERS, 'limit=all');
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <TopBar />
      {children}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: getCurrentUser(state),
});

export default connect(mapStateToProps, {
  getAllData: _getAllData,
  getUserData: _getUserData,
})(PrivateContainer);
