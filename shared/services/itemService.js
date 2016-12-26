import {HTTPS, SERVER_ADDR, HTTPUtil, getAuthHeaders, queryBuilder,
  createQueryObject} from '../utils';

const ENDPOINT = '/api/items';

// const ADDRESS = {
//   DEFAULT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}`
// };

const RESTManager = {
  add: (body) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}`;
    return HTTPUtil.post(address, getAuthHeaders(), body);
  },
  get: (itemKey) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}/${itemKey}`;
    return HTTPUtil.get(address);
  },
  getAll: (zoomLevel, lat, lng, isThumbnail = true) => {
    const queries = [];
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', lng));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('isThumbnail', isThumbnail));
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT}${queryBuilder(queries)}`;
    return HTTPUtil.get(address, getAuthHeaders())
  }
};
export default RESTManager;