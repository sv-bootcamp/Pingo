import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';

const STORAGE_KEY_accessToken = '@PingoStorage:accessToken';
const STORAGE_KEY_refreshToken = '@PingoStorage:refreshToken';
const STORAGE_KEY_userKey = '@PingoStorage:userKey';
const STORAGE_KEY_secret = '@PingoStorage:secret';
const STORAGE_KEY_loginType = '@PingoStorage:loginType';

const signupFacebookUser = (FacebookToken) => {
  const address = 'https://goober.herokuapp.com/api/users/signup';
  const bodySignUp = JSON.stringify({
    'userType': 'facebook',
    'facebookToken': FacebookToken
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodySignUp
  })
  .then((response) => response.json())
  .then((rjson) => {
    console.log(rjson);
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
    setUserKey(rjson.userKey);
    })
  .catch((error) => {
    console.log(error);
  });
};

export const signupGuestUser = () => {
  const address = 'https://goober.herokuapp.com/api/users/signup';
  const bodySignUp = JSON.stringify({
    'userType': 'anonymous'
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodySignUp
  })
    .then((response) => response.json())
    .then((rjson) => {
      console.log(rjson);
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
      setUserKey(rjson.userId);
      setSecretToken(rjson.secret);
    })
    .catch((error) => {
      console.log(error);
    });
};

// todo: refactor the below two functions
export const grantAnonymousUser = (secret, userKey) => {
  const address = 'https://goober.herokuapp.com/api/auth/grant';
  const bodyGrant = JSON.stringify({
    'grantType': 'anonymous',
    'secret': secret,
    'userKey': userKey
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyGrant
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error(response.status);
    }
  })
  .then((rjson) => {
    console.log(rjson);
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
    signupGuestUser();
  });
};

export const grantFacebookUser = (facebookToken, userKey) => {
  const address = 'https://goober.herokuapp.com/api/auth/grant';
  console.log(address);
  console.log('fbtoken ' + facebookToken);
  const bodyGrant = JSON.stringify({
    'grantType': 'facebook',
    'facebookToken': facebookToken
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyGrant
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error(response.status);
    }
  })
  .then((rjson) => {
    console.log(rjson);
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
    signupFacebookUser(facebookToken);
  });
};

const setAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_accessToken, accessToken);
  } catch (error) {
    console.log(error.message);
  }
};

const setRefreshToken = async (refreshToken) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_refreshToken, refreshToken);
  } catch (error) {
    console.log(error.message);
  }
};

const setUserKey = async (userId) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_userKey, userId);
  } catch (error) {
    console.log(error.message);
  }
};

const setSecretToken = async (secret) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_secret, secret);
  } catch (error) {
    console.log(error.message);
  }
};
// todo : pass it to grantfbuser after receiving 400
export const requestRefreshTokenFacebook = async (refreshToken) => {
  const address = 'https://goober.herokuapp.com/api/auth/refresh';
  fetch(address, {
    method: 'POST',
    headers: {
      'refreshToken': refreshToken
    }
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error(response.status);
      }
    })
    .then((rjson) => {
      console.log(rjson);
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    })
    .catch((error) => {
      console.log(error);
      removeUserToken();
    })
  })
};

export const requestRefreshTokenGuest = async (refreshToken) => {
  const address = 'https://goober.herokuapp.com/api/auth/refresh';
  fetch(address, {
    method: 'POST',
    headers: {
      'refreshToken': refreshToken
    }
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error(response.status);
      }
    })
    .then((rjson) => {
      console.log(rjson);
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    })
    .catch((error) => {
      console.log(error);
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
    })
  })
};

export const setToken = (token) => {
  return {
    type: types.setToken,
    token
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_accessToken);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSecretToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_secret);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_refreshToken);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserKey = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_userKey);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_accessToken);
    await AsyncStorage.removeItem(STORAGE_KEY_refreshToken);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLoginType = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_loginType);
  } catch (error) {
    console.log(error.message);
  }
};

export const setLoginType = async (loginType) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_loginType, loginType);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeLoginType = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_loginType);
  } catch (error) {
    console.log(error.message);
  }
};
