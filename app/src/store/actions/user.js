import axios from '../../utils/axios';

export const login = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/users/login', payload);

    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('id', data.id);

    //Get current user data
    const { data: currentUser } = await axios.get(`/users/${data.id}`);

    console.log(currentUser);
  } catch (err) {
    throw err;
  }
};
