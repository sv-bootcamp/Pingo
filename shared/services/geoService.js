import {HTTPUtil, createQueryObject, queryBuilder} from '../utils';

export const API_KEY = 'AIzaSyAyPPoj64FoqPCqFTDQBkR9aNM493v_xH4';

const ADDRESS = {
  GET_ADDRESS: `https://maps.googleapis.com/maps/api/geocode/json`
};

const RESTManager = {
  getAddressData: (lat, lng) => {
    const queries = [];
    queries.push(createQueryObject('latlng', `${lat},${lng}`));
    queries.push(createQueryObject('key', `${API_KEY}`));
    return HTTPUtil.get(`${ADDRESS.GET_ADDRESS}${queryBuilder(queries)}`);
  }
};
export default RESTManager;
