import axios from '../../utils/axios';
import { SET_USER } from '../reducers/user';

export const login = (payload, updateLogin) => async (dispatch) => {
  try {
    const { data } = await axios.post('/users/login', payload);

    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('id', data.id);

    //Get current user data
    const { data: user } = await axios.get(`/users/${data.id}`);

    dispatch({
      type: 'resources.storage.set',
      payload: {
        id: 'access',
        data: 'granted',
      },
    });

    return dispatch({
      type: SET_USER,
      data: user,
    });
  } catch (err) {
    throw err;
  }
};

export const getUserData = () => async (dispatch) => {
  const id = window.localStorage.getItem('id');

  const { data: user } = await axios.get(`/users/${id}`);

  return dispatch({
    type: SET_USER,
    data: user,
  });
};
