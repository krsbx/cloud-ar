import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import { IResourcesBase } from 'utils/resourcesInterface';

export interface IAxiosReqHeaders extends AxiosRequestHeaders {
  Authorization: string;
  resourceName: keyof IResourcesBase;
  // @ts-ignore
  overwrite: boolean;
}

export interface IAxiosInstance extends AxiosInstance {
  config?: {
    headers: IAxiosReqHeaders;
  };
}

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  headers?: IAxiosReqHeaders & {
    Authorization?: string;
    resourceName?: keyof IResourcesBase;
  };
  resourceName?: keyof IResourcesBase;
  overwrite?: boolean;
}

export interface IAxiosResponse extends AxiosResponse {
  config: IAxiosRequestConfig;
}
