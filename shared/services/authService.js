import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS} from '../utils';

const ENDPOINT = '/api/auth';

const GRANT = '/grant';
const REFRESH = '/refresh';

const GRANT_TYPE = {
  ANONYMOUS: 'anonymous',
  FACEBOOK: 'facebook'
};

const RESTManager = {
  grant: (body) => {
    // TODO : if you want to ensure all elements provided, Refactoring with assert or something
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${GRANT}`;
    return HTTPUtil.post(address, DEFAULT_HEADERS, body);
  },
  grantFacebook: (facebookToken) => {
    return RESTManager.grant({
      grantType: GRANT_TYPE.FACEBOOK,
      facebookToken
    });
  },
  grantGuest: (userKey, userSecret) => {
    console.log(userKey);
    console.log(userSecret);
    return RESTManager.grant({
      grantType: GRANT_TYPE.ANONYMOUS,
      userSecret,
      userKey
    });
  },
  refresh: (refreshToken) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${REFRESH}`;
    return HTTPUtil.post(address, DEFAULT_HEADERS, {refreshToken});
  }
};
export default RESTManager;
