export const HTTP = 'http://';
export const HTTPS = 'https://';
export const SERVER_ADDR = 'pn-go.com';
//export const SERVER_ADDR = 'goober.herokuapp.com';
export const ENDPOINT_ITEM = '/api/items';
export const ENDPOINT_IMAGE = '/api/images';
export const ENDPOINT_USER = '/api/users';
export const ENDPOINT_SIGNUP = '/api/users/signup';
export const ENDPOINT_CREATEDPOST = '/api/users/createdposts';
export const ENDPOINT_GRANT = '/api/auth/grant';
export const ENDPOINT_REFRESH = '/api/auth/refresh';
export const ENDPOINT_SAVEDPOST = '/api/users/savedposts';
export const ENDPOINT_REPORT = '/api/reports';
export const API_KEY = 'AIzaSyBQj4eFHtV1G9mTKUzAggz384jo4h7oFhg';
export const API_GEODATA = 'https://maps.googleapis.com/maps/api/geocode/json';

export const createQueryObject = (key, value) => {
  return {key, value};
};
export const queryBuilder = (arr) => {
  /* arr is array of Object which form is {key:-, value:-} */
  const strings = arr.map((obj) => {
    return `${obj.key.toString()}=${obj.value.toString()}`;
  });
  const queryString = strings.reduce((first, second) => {
    return `${first}&${second}`;
  });
  return `?${queryString}`;
};
