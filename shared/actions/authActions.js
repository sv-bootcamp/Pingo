import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';
import AuthRESTManager from '../services/authService';
import UserRESTManager from '../services/userService';

export const STORAGE_NAME = '@PingoStorage:';
export const STORAGE_KEY = {
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

const setAccessToken = async (accessToken) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`, accessToken);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

const setRefreshToken = async (refreshToken) => {
  try {
    if (refreshToken) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`, refreshToken);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

const setUserKey = async (userKey) => {
  try {
    if (userKey) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`, userKey);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

const setSecretToken = async (secret) => {
  try {
    if (secret) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_secret}`, secret);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export const signupFacebookUser = (FacebookToken) => {
  return UserRESTManager.signupFacebook(FacebookToken)
    .then((rjson) => {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
      setUserKey(rjson.userKey);
      return null;
    })
    .catch((error) => {
      // TODO : need to change error checking method
      if (error.message === 'Already exist.') {
        // TDOO: TBD
      }
      console.log(error); // eslint-disable-line no-console
    });
};

export const signupGuestUser = async () => {
  return UserRESTManager.signupGuest()
    .then((rjson) => {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
      setUserKey(rjson.userKey);
      setSecretToken(rjson.userSecret);
      return null;
    })
    .catch(console.log); // eslint-disable-line no-console
};

// todo: refactor the below two functions
// @TODO need to change this function's name.
export const grantAnonymousUser = (secret, userKey) => {
  if (!secret || !userKey) {
    return signupGuestUser();
  }
  return AuthRESTManager.grantGuest(userKey, secret)
    .then((rjson) => {
      if (rjson) {
        setAccessToken(rjson.accessToken);
        setRefreshToken(rjson.refreshToken);
        setUserKey(rjson.userKey);
      }
    })
    .catch((error) => {
      // TODO : need to change error checking method
      if (error.message === 'wrong secret') {
        signupGuestUser();
      }
      console.log(error); // eslint-disable-line no-console
    });
};

// @TODO need to change this function's name.
export const grantFacebookUser = async (facebookToken) => {
  return AuthRESTManager.grantFacebook(facebookToken)
    .then((rjson) => {
      if (rjson) {
        setAccessToken(rjson.accessToken);
        setRefreshToken(rjson.refreshToken);
        setUserKey(rjson.userKey);
      }
    })
    .catch(error => {
      console.log(error.message); // eslint-disable-line no-console
      return signupFacebookUser(facebookToken);
    });
};

export const setLoginType = async (loginType) => {
  try {
    await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`, loginType);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export const setToken = (token) => {
  return {
    type: types.setToken,
    token
  };
};

export const setUserName = (userName) => {
  return {
    type: types.setUserName,
    userName
  };
};

export const setUserEmail = (userEmail) => {
  return {
    type: types.setUserEmail,
    userEmail
  };
};

export const setProfileImgUrl = (profileImgUrl) => {
  return {
    type: types.setProfileImgUrl,
    profileImgUrl
  };
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return null;
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return null;
};

export const getUserKey = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return null;
};

export const getSecretToken = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_secret}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return null;
};

export const getLoginType = async () => {
  try {
    return await AsyncStorage.getItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  return null;
};

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`);
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export const removeLoginType = async () => {
  try {
    await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_loginType}`);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

// todo : pass it to grantfbuser after receiving 400
export const requestRefreshTokenFacebook = (refreshToken) => {
  return AuthRESTManager.refresh(refreshToken)
    .then((rjson) => {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    })
    .catch((error) => {
      // TODO : need to change error checking method
      if (error.message === 'Not a valid refresh token') {
        removeUserToken();
      }
      console.log(error); // eslint-disable-line no-console
    });
};

export const requestRefreshTokenGuest = (refreshToken) => {
  return AuthRESTManager.refresh(refreshToken)
    .then((rjson) => {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    })
    .catch((error) => {
      // TODO : need to change error checking method
      if (error.message === 'Not a valid refresh token') {
        console.log(error); // eslint-disable-line no-console
        return;
      }

      let secret;
      getSecretToken().then((secretToken) => {
        secret = secretToken;
        return secret ? getUserKey() : signupGuestUser();
      }).then(userId => (userId && secret) ?
        grantAnonymousUser(secret, userId) : null);
    });
};

export const getUserInformation = (userKey) => {
  return UserRESTManager.getUserInfo(userKey)
    .catch(console.log); // eslint-disable-line no-console
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
    console.log(error); // eslint-disable-line no-console
  }
};
