import * as types from './actionTypes';

export const TBD = () => {
  return {
    type: types.TBD
  };
};

export const onLocationChange = (region) => {
	return {
		type: types.onLocationChange,
		region: region
	}
}
