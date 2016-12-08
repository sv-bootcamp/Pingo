import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS, createQueryObject, queryBuilder, getAuthHeaders}
  from '../utils';

const ENDPOINT = '/api/images';

const ADDRESS = {
  DEFAULT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}`
};

const RESTManager = {
  add: (body) => {
    // const {itemKey, userKey, caption, image} = body;
    return HTTPUtil.post(`${ADDRESS.DEFAULT}`, getAuthHeaders(), body);
  },
  get: (imageKey) => {
    return HTTPUtil.get(`${ADDRESS.DEFAULT}/${imageKey}`, getAuthHeaders());
  },
  getAllByItemKey: (itemKey) => {
    const query = [];
    query.push(createQueryObject('item', itemKey));
    return HTTPUtil.get(`${ADDRESS.DEFAULT}${queryBuilder(query)}`, getAuthHeaders());
  }
};
export default RESTManager;