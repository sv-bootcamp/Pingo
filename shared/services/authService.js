import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS} from '../utils';

const ENDPOINT = '/api/auth';

/*
TODO : checkout ADDRESS constant below
It does not work now, The log said something like
cannot fetch from...
undefinedundefined/api/auth/grant

I think, The making time of constant is not guaranteed the sequence.
*/
const ADDRESS = {
  GRANT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/grant`,
  REFRESH: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/refresh`
};

const GRANT_TYPE = {
  ANONYMOUS: 'anonymous',
  FACEBOOK: 'facebook'
};

const RESTManager = {
  grant: (body) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/grant`;
    return HTTPUtil.post(address, DEFAULT_HEADERS, body);
  },
  grantFacebook: (facebookToken) => {
    return RESTManager.grant({
      grantType: GRANT_TYPE.FACEBOOK,
      facebookToken
    });
  },
  grantGuest: (userKey, userSecret) => {
    return RESTManager.grant({
      grantType: GRANT_TYPE.ANONYMOUS,
      userSecret,
      userKey
    });
  },
  refresh: (refreshToken) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/refresh`;
    return HTTPUtil.post(address, DEFAULT_HEADERS, {refreshToken});
  }
};
export default RESTManager;