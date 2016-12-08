import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';
import {
  HTTPS,
  SERVER_ADDR,
  ENDPOINT_USER,
  ENDPOINT_SIGNUP,
  ENDPOINT_GRANT,
  ENDPOINT_REFRESH,
  DEFAULT_HEADERS,
  getAuthHeaders,
  HTTPUtil
} from '../utils';

const STORAGE_NAME = '@PingoStorage:';
const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_KEY: 'userKey',
  SECRET: 'secret',
  LOGIN_TYPE: 'loginType'
};
const STORAGE_KEY_accessToken = 'accessToken';
const STORAGE_KEY_refreshToken = 'refreshToken';
const STORAGE_KEY_userKey = 'userKey';
const STORAGE_KEY_secret = 'secret';
const STORAGE_KEY_loginType = 'loginType';

export const signupFacebookUser = async (FacebookToken) => {
  const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SIGNUP}`;
  const headers = DEFAULT_HEADERS;
  const body = JSON.stringify({
    'userType': 'facebook',
    'facebookToken': FacebookToken
  });
  await fetch(address, {
    method: 'POST',
    headers,
    body
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(response.status);
  })
  .then((rjson) => {
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
    setUserKey(rjson.userKey);
    return null;
  })
  .catch((error) => {
    console.log(error);
  });
};

export const signupGuestUser = async () => {
  const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SIGNUP}`;
  const headers = DEFAULT_HEADERS;
  const body = JSON.stringify({
    'userType': 'anonymous'
  });
  await fetch(address, {
    method: 'POST',
    headers,
    body
  })
  .then((response) => response.json())
  .then((rjson) => {
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
    setUserKey(rjson.userKey);
    setSecretToken(rjson.userSecret);
    return null;
  })
  .catch((error) => {
    console.log(error);
  });
};

// todo: refactor the below two functions
export const grantAnonymousUser = async (secret, userKey) => {
  try {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_GRANT}`;
    const headers = DEFAULT_HEADERS;
    const body = JSON.stringify({
      'grantType': 'anonymous',
      'userSecret': secret,
      'userKey': userKey
    });
    await fetch(address, {
      method: 'POST',
      headers,
      body
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return signupGuestUser();
      }
    })
    .then((rjson) => {
      if (rjson) {
        setAccessToken(rjson.accessToken);
        setRefreshToken(rjson.refreshToken);
        setUserKey(rjson.userKey);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};

export const grantFacebookUser = async (facebookToken) => {
  try {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_GRANT}`;
    const headers = DEFAULT_HEADERS;
    const body = JSON.stringify({
      'grantType': 'facebook',
      'facebookToken': facebookToken
    });
    await fetch(address, {
      method: 'POST',
      headers,
      body
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((rjson) => {
      if (rjson) {
        setAccessToken(rjson.accessToken);
        setRefreshToken(rjson.refreshToken);
        setUserKey(rjson.userKey);
      } else {
        return signupFacebookUser(facebookToken);
      }
    })
    .then()
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
  } catch (error) {
    console.log(error);
  }
};

const setAccessToken = async (accessToken) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`, accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};

const setRefreshToken = async (refreshToken) => {
  try {
    if (refreshToken) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`, refreshToken);
    }
  } catch (error) {
    console.log(error);
  }
};

const setUserKey = async (userKey) => {
  try {
    if (userKey) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`, userKey);
    }
  } catch (error) {
    console.log(error);
  }
};

const setSecretToken = async (secret) => {
  try {
    if (secret) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_secret}`, secret);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setLoginType = async (loginType) => {
  try {
    await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`, loginType);
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token) => {
  return {
    type: types.setToken,
    token
  }
};

export const setUserName = (userName) => {
  return {
    type: types.setUserName,
    userName
  }
};

export const setUserEmail = (userEmail) => {
  return {
    type: types.setUserEmail,
    userEmail
  }
};

export const setProfileImgUrl = (profileImgUrl) => {
  return {
    type: types.setProfileImgUrl,
    profileImgUrl
  }
};
// todo : pass it to grantfbuser after receiving 400
export const requestRefreshTokenFacebook = async (refreshToken) => {
  const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_REFRESH}`;
  const headers = DEFAULT_HEADERS;
  const body = JSON.stringify({
    'refreshToken': refreshToken
  });
  return fetch(address, {
    method: 'POST',
    headers,
    body
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      removeUserToken();
    }
  })
  .then((rjson) => {
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
  })
};

export const requestRefreshTokenGuest = async (refreshToken) => {
  const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_REFRESH}`;
  const headers = DEFAULT_HEADERS;
  const body = JSON.stringify({
    'refreshToken': refreshToken
  });
  fetch(address, {
    method: 'POST',
    headers,
    body
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      getSecretToken().then((secret) => {
        if (secret !== null) {
          getUserKey().then((userId) => {
            if (userId !== null) {
              grantAnonymousUser(secret, userId);
            }
          });
        } else {
          signupGuestUser();
        }
      });
    }
  })
  .then((rjson) => {
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
  })
};

export const getUserInformation = async (userKey, accessToken) => {
  try {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_USER}/${userKey}`;
    const headers = getAuthHeaders(accessToken);
    return await fetch(address, {
      method: 'GET',
      headers
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((rjson) => {
      return rjson;
    })
    .catch((error) => {
      console.log(error);
    })
  } catch (error) {
    console.log(error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`);
  } catch (error) {
    console.log(error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`);
  } catch (error) {
    console.log(error);
  }
};

export const getUserKey = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`);
  } catch (error) {
    console.log(error);
  }
};

export const getSecretToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_secret}`);
  } catch (error) {
    console.log(error);
  }
};

export const getLoginType = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`);
  } catch (error) {
    console.log(error);
  }
};

export const removeLoginType = async () => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`);
  } catch (error) {
    console.log(error);
  }
};

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`);
  } catch (error) {
    console.log(error);
  }
};
// todo: this is for developing. It should not be used in release. remove later if possible
export const removeAllDev = async () => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_secret}`);
  } catch (error) {
    console.log(error);
  }
};
