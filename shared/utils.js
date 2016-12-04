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
export const API_KEY = 'AIzaSyAyPPoj64FoqPCqFTDQBkR9aNM493v_xH4';
export const API_GEODATA = 'https://maps.googleapis.com/maps/api/geocode/json';

export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const getAuthHeaders = (accessToken) => {
  DEFAULT_HEADERS.Authorization = `bearer ${accessToken}`;
  return DEFAULT_HEADERS;
};

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

export const HTTPUtil = {
  get: (address, headers) => {
    return fetch(address, {
      method: 'GET',
      headers
    }).then(response => response.json());
  },
  post: (address, headers, body) => {
    return fetch(address, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json());
  },
  put: (address, headers, body) => {
    return fetch(address, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json());
  },
  delete: (address, headers, body) => {
    return fetch(address, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json());
  },
};
