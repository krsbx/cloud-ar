import jwt_decode, { JwtPayload } from 'jwt-decode';

export const isAuthenticated = !!window.localStorage.getItem('access_token');

export const checkAccessToken = () => {
  const token = window.localStorage.getItem('access_token');

  if (!token) return false;

  const { exp: tokenExp } = jwt_decode<JwtPayload>(token);

  const date = Date.now();

  if (tokenExp) return date < tokenExp * 1000;

  return false;
};

export const checkRefreshToken = () => {
  const refresh = window.localStorage.getItem('refresh_token');

  if (!refresh) return false;

  const { exp: refreshExp } = jwt_decode<JwtPayload>(refresh);

  const date = Date.now();

  if (refreshExp) return date < refreshExp * 1000;

  return false;
};

export const checkExpires = () => {
  return checkAccessToken() || checkRefreshToken();
};

export const logOut = () => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.localStorage.removeItem('id');

  window.location.href = '/';
};
