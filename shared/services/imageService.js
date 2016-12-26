import {HTTPS, SERVER_ADDR, HTTPUtil, createQueryObject, queryBuilder, getAuthHeaders}
  from '../utils';

const ENDPOINT = '/api/images';

const RESTManager = {
  add: (body) => {
    // TODO : if you want to ensure all elements provided, Refactoring with assert or something
    // const {itemKey, userKey, caption, image} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}`;
    return HTTPUtil.post(address, getAuthHeaders(), body);
  },
  get: (imageKey) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/${imageKey}`;
    return HTTPUtil.get(address, getAuthHeaders());
  },
  getAllByItemKey: (itemKey) => {
    const query = [];
    query.push(createQueryObject('item', itemKey));
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${queryBuilder(query)}`;
    return HTTPUtil.get(address, getAuthHeaders());
  }
};
export default RESTManager;