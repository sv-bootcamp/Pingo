import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS, getAuthHeaders} from '../utils';

const ENDPOINT = '/api/users';

// const ADDRESS = {
//   DEFAULT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}`,
//   SIGNUP: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/signup`,
//   SAVED_POSTS: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/savedposts`,
//   CREATED_POSTS: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/createdposts`
// };
const SIGNUP = '/signup';
const SAVEDPOSTS = '/savedposts';
const CREATEDPOSTS = '/createdposts';

const USER_TYPE = {
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
    return HTTPUtil.get(address, getAuthHeaders());
  },
  addSavedPosts: (body) => {
    // const {entity, itemKey} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return HTTPUtil.post(address, getAuthHeaders(), body);
  },
  getSavedPosts: () => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return HTTPUtil.get(address, getAuthHeaders());
  },
  deleteSavedPost: (body) => {
    // const {itemKey} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${SAVEDPOSTS}`;
    return HTTPUtil.delete(address, getAuthHeaders(), body);
  },
  getCreatedPosts: () => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${CREATEDPOSTS}`;
    return HTTPUtil.get(address, getAuthHeaders());
  }
};
export default RESTManager;