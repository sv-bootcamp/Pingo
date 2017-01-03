import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS, getAuthHeaders} from '../utils';

const ENDPOINT = '/api/users';

const SIGNUP = '/signup';
const SAVEDPOSTS = '/savedposts';
const CREATEDPOSTS = '/createdposts';

export const USER_TYPE = {
  FACEBOOK: 'facebook',
  ANONYMOUS: 'anonymous'
};

export const POST_ENTITY = {
  ITEM: 'item',
  IMAGE: 'image'
};

const RESTManager = {
  signup: (body) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SIGNUP}`;
    return HTTPUtil.post(address, DEFAULT_HEADERS, body);
  },
  signupGuest: () => {
    return RESTManager.signup({
      userType: USER_TYPE.ANONYMOUS
    });
  },
  signupFacebook: (facebookToken) => {
    return RESTManager.signup({
      userType: USER_TYPE.FACEBOOK,
      facebookToken
    });
  },
  getUserInfo: (userKey) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/${userKey}`;
    return getAuthHeaders().then((headers) => HTTPUtil.get(address, headers));
  },
  addSavedPosts: (body) => {
    // const {entity, itemKey} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return getAuthHeaders().then((headers) => HTTPUtil.post(address, headers, body));
  },
  getSavedPosts: () => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return getAuthHeaders().then((headers) => HTTPUtil.get(address, headers));
  },
  deleteSavedPost: (body) => {
    // const {itemKey} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return getAuthHeaders().then((headers) => HTTPUtil.delete(address, headers, body));
  },
  getCreatedPosts: () => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${CREATEDPOSTS}`;
    return getAuthHeaders().then((headers) => HTTPUtil.get(address, headers));
  }
};
export default RESTManager;
