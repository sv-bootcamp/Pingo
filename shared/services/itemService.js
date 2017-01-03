import {HTTPS, SERVER_ADDR, HTTPUtil, getAuthHeaders, queryBuilder,
  createQueryObject} from '../utils';

const ENDPOINT = '/api/items';

const RESTManager = {
  add: (body) => {
    // TODO : if you want to ensure all elements provided, Refactoring with assert or something
    // const {title, lat, lng, address, category, image, userKey, startTime, endTime, caption} = body;
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}`;
    return getAuthHeaders().then((headers) => HTTPUtil.post(address, headers, body));
  },
  get: (itemKey) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/${itemKey}`;
    return HTTPUtil.get(address);
  },
  getByArea: (zoomLevel, lat, lng, isThumbnail = true) => {
    const queries = [];
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', lng));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('isThumbnail', isThumbnail));
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${queryBuilder(queries)}`;
    return getAuthHeaders().then((headers) => HTTPUtil.get(address, headers));
  },
  remove: (itemKey) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/${itemKey}`;
    return getAuthHeaders().then((headers) => HTTPUtil.delete(address, headers));
  }
};
export default RESTManager;
