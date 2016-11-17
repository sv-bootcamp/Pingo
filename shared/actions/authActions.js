import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';

const STORAGE_NAME = '@PingoStorage:';
const STORAGE_KEY_accessToken = 'accessToken';
const STORAGE_KEY_refreshToken = 'refreshToken';
const STORAGE_KEY_userKey = 'userKey';
const STORAGE_KEY_secret = 'secret';
const STORAGE_KEY_loginType = 'loginType';

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
    setUserKey(rjson.userKey);
    setSecretToken(rjson.userSecret);
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
      signupGuestUser();
      return null;
    }
  })
  .then((rjson) => {
    console.log(rjson);
    if (rjson !== null) {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    }
  })
  .catch((error) => {
    console.log(error);
  });
};

export const grantFacebookUser = (facebookToken, userKey) => {
  const address = 'https://goober.herokuapp.com/api/auth/grant';
  console.log(address);
  console.log('fbtoken ' + facebookToken);
  const bodyGrant = JSON.stringify({
    'grantType': 'facebook',
    'facebookToken': facebookToken,
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
      signupFacebookUser(facebookToken);
      return null;
    }
  })
  .then((rjson) => {
    console.log(rjson);
    if (rjson !== null) {
      setAccessToken(rjson.accessToken);
      setRefreshToken(rjson.refreshToken);
    }
  })
  .catch((error) => {
    console.log(error);
  });
};

const setAccessToken = async (accessToken) => {
  try {
    if (accessToken !== null) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_accessToken}`, accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};

const setRefreshToken = async (refreshToken) => {
  try {
    if (refreshToken !== null) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_refreshToken}`, refreshToken);
    }
  } catch (error) {
    console.log(error);
  }
};

const setUserKey = async (userKey) => {
  try {
    if (userKey !== null) {
      await AsyncStorage.setItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`, userKey);
    }
  } catch (error) {
    console.log(error);
  }
};

const setSecretToken = async (secret) => {
  try {
    if (secret !== null) {
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
  const address = 'https://goober.herokuapp.com/api/auth/refresh';
  const bodyRequestRefreshToken = JSON.stringify({
    'refreshToken': refreshToken
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      'refreshToken': bodyRequestRefreshToken
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      removeUserToken();
    }
  })
  .then((rjson) => {
    console.log(rjson);
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
  })
};

export const requestRefreshTokenGuest = async (refreshToken) => {
  const address = 'https://goober.herokuapp.com/api/auth/refresh';
  const bodyRequestRefreshToken = JSON.stringify({
    'refreshToken': refreshToken
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      'refreshToken': bodyRequestRefreshToken
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
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
    console.log(rjson);
    setAccessToken(rjson.accessToken);
    setRefreshToken(rjson.refreshToken);
  })
  .catch((error) => {
    console.log(error);
  })
};

export const getUserInformation = async (userKey) => {
  const address = `http://goober.herokuapp.com/api/users/${userKey}`;
  const bodyGetUserInformation = JSON.stringify({
    'id': userKey
  });
  fetch(address, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyGetUserInformation
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 500) {
      throw new Error(response.status);
    }
  })
  .then((rjson) => {
    console.log(rjson);
    return rjson;
  })
  .catch((error) => {
    console.log(error);
  })
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
        await AsyncStorage.removeItem(`${STORAGE_NAME}${STORAGE_KEY_userKey}`);
    } catch (error) {
        console.log(error);
    }
};
