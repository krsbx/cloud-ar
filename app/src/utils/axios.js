import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  setResource,
  overwriteResource,
  updateResource,
} from '../store/actions/resources';

export const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('access_token');
  const refresh = window.localStorage.getItem('refresh_token');

  if (token) {
    const { exp: tokenExp } = jwt_decode(token);

    if (Date.now() > tokenExp * 1000) {
      if (refresh) {
        const { exp: refreshExp } = jwt_decode(refresh);

        if (Date.now() > refreshExp * 1000) {
          //Call logout Functions
        } else {
          //Create a new request to refresh token
        }
      }
    }
  }

  config.headers.authorization = token ? `Bearer ${token}` : '';
  config.headers.accesstoken = refresh ? `Bearer ${refresh}` : '';
  config.resourceName = config.headers.resourceName;
  config.overwrite = config.headers.overwrite;

  return config;
});

export const interceptResponse = (dispatch, getState) => {
  instance.interceptors.response.use((response) => {
    const { config, data } = response;

    if (!config.resourceName) return response;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return response;
  });
};

export default instance;
