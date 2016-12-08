import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS, getAuthHeaders} from '../utils';

const ENDPOINT = '/api/users';

const ADDRESS = {
  DEFAULT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}`,
  SIGNUP: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/signup`,
  SAVED_POSTS: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/savedposts`,
  CREATED_POSTS: `${HTTPS}${SERVER_ADDR}${ENDPOINT}/createdposts`
};

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
    return HTTPUtil.post(ADDRESS.SIGNUP, DEFAULT_HEADERS, body);
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
    return HTTPUtil.get(`${ADDRESS.DEFAULT}/${userKey}`, getAuthHeaders());
  },
  addSavedPosts: (body) => {
    // const {entity, itemKey} = body;
    return HTTPUtil.post(`${ADDRESS.SAVED_POSTS}`, getAuthHeaders(), body);
  },
  getSavedPosts: () => {
    return HTTPUtil.get(`${ADDRESS.SAVED_POSTS}`, getAuthHeaders());
  },
  deleteSavedPost: (body) => {
    // const {itemKey} = body;
    return HTTPUtil.delete(`${ADDRESS.SAVED_POSTS}`, getAuthHeaders(), body);
  },
  getCreatedPosts: () => {
    return HTTPUtil.get(`${ADDRESS.CREATED_POSTS}`, getAuthHeaders());
  }
};
export default RESTManager;