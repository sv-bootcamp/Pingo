import {STORAGE_NAME, STORAGE_KEY} from './actions/authActions';
import {AsyncStorage} from 'react-native';
export const HTTP = 'http://';
export const HTTPS = 'https://';
export const SERVER_ADDR = 'pn-go.com';
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

export const getAuthHeaders = async (accessToken) => {
  if (!accessToken) {
    accessToken = await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY.ACCESS_TOKEN}`);
  }
  const headers = JSON.parse(JSON.stringify(DEFAULT_HEADERS));
  headers.Authorization =  `bearer ${accessToken}`;
  return headers;
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
    }).then(response => {
      if(!response.ok) throw Error(response.json().error);
      return response.json();
    });
  },
  post: (address, headers, body) => {
    return fetch(address, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      if(!response.ok) throw Error(response.json().error);
      return response.json();
    });
  },
  put: (address, headers, body) => {
    return fetch(address, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      if(!response.ok) throw Error(response.json().error);
      return response.json();
    });
  },
  delete: (address, headers, body) => {
    return fetch(address, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      if(!response.ok) throw Error(response.json().error);
      return response.json();
    });
  },
};

export const transformTodate = (data) => {
  const startTime = new Date(data.startTime);
  const endTime = (data.endTIme) ? new Date(data.endTime) : '';
  let date = '';
  function transform(date){
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let meridiem = 'am';
    let hour = date.getHours();
    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      meridiem = 'pm';
    } else if (hour > 12) {
      hour %= 12;
      meridiem = 'pm';
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute === 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = `0${minute}`;
    }
    return monthNames[startTime.getMonth()] + '. ' + startTime.getDate() + ', ' + hour + ':' + minute + meridiem;
  }
  date += transform(startTime) + ' - ';
  date += (endTime) ? transform(endTime) : '?';
  return date;
}
