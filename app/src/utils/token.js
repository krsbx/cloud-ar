import axios from './axios';

export const generateNewToken = async () => {
  const { data } = await axios.post(`/token/refresh`);

  localStorage.setItem('access_token', data.token);
  localStorage.setItem('refresh_token', data.refresh);
  localStorage.setItem('id', data.id);
};
