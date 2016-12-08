import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS} from '../utils';

const ENDPOINT = '/api/auth';

const ADDRESS = {
  GRANT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/grant`,
  REFRESH: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/refresh`
};

const GRANT_TYPE = {
  ANONYMOUS: 'anonymous',
  FACEBOOK: 'facebook'
}

const RESTManager = {
  grant: (body) => {
      return HTTPUtil.post(ADDRESS.GRANT, DEFAULT_HEADERS, body);
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
      return HTTPUtil.post(ADDRESS.REFRESH, DEFAULT_HEADERS, {refreshToken});
  }
};
export default RESTManager;