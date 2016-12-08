import {HTTPS, SERVER_ADDR, HTTPUtil, DEFAULT_HEADERS, getAuthHeaders, queryBuilder,
  createQueryObject} from '../utils';

const ENDPOINT = '/api/items';

const ADDRESS = {
  DEFAULT: `${HTTPS}${SERVER_ADDR}${ENDPOINT}`
};

const RESTManager = {
  add: (body) => {
    // const {title, lat, lng, address, category, image, userKey, startTime, endTime, caption} = body;
    return HTTPUtil.post(ADDRESS.DEFAULT, getAuthHeaders(), body);
  },
  get: (itemKey) => {
    return HTTPUtil.get(`${ADDRESS.DEFAULT}/${itemKey}`);
  },
  getAll: (zoomLevel, lat, lng, isThumbnail = true) => {
    const queries = [];
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', lng));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('isThumbnail', isThumbnail));
    return HTTPUtil.get(`${ADDRESS.DEFAULT}${queryBuilder(queries)}`, getAuthHeaders())
  }
};
export default RESTManager;