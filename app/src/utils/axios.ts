import axios from 'axios';
import { AppDispatch } from 'store';
import {
  overwriteResource,
  setResource,
  updateResource,
} from 'store/actions/resources';
import {
  IAxiosInstance,
  IAxiosRequestConfig,
  IAxiosResponse,
} from 'utils/axiosInterface';

const instance: IAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const applyInterceptors = (dispatch: AppDispatch) => {
  instance.interceptors.request.use(
    (conf) => {
      const token = window.localStorage.getItem('access_token');

      const config = conf as IAxiosRequestConfig;

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        config.resourceName = config.headers.resourceName;
        config.overwrite = config.headers.overwrite;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use((res) => {
    const { config, data } = res as IAxiosResponse;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;
