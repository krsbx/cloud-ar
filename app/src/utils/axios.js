import axios from 'axios';
import {
  setResource,
  overwriteResource,
  updateResource,
} from '../store/actions/resources';
import { generateNewToken } from './token';
import { logOut, checkExpires, checkRefreshToken } from './user';

export const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('access_token');
  const refresh = window.localStorage.getItem('refresh_token');

  if (!!token || !!refresh) {
    if (!checkExpires()) {
      logOut();
    }
  }

  config.headers.authorization = token ? `Bearer ${token}` : '';
  config.headers.refreshtoken = refresh ? `Bearer ${refresh}` : '';
  config.resourceName = config.headers.resourceName;
  config.overwrite = config.headers.overwrite;

  return config;
});

export const interceptResponse = (dispatch, getState) => {
  instance.interceptors.response.use(
    (response) => {
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
    },
    async (err) => {
      const originalRequest = err.config;

      if (checkRefreshToken()) {
        try {
          await generateNewToken();

          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        logOut();
      }

      return Promise.reject(err);
    }
  );
};

export default instance;
