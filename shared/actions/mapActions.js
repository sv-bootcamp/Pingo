import * as types from './actionTypes';

export const onLocationChange = (region) => {
	return {
		type: types.onLocationChange,
		region: region
	}
}
