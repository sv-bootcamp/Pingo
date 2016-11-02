import {createQueryObject, queryBuilder} from '../shared/utils';

it('create REST query object', () => {
  const expected = {
    key: 'key',
    value: 'value'
  };
  expect(createQueryObject(expected.key, expected.value).key).toBe(expected.key);
  expect(createQueryObject(expected.key, expected.value).value).toBe(expected.value);
});

it('create REST query object', () => {
  const queryLat = {
    key: 'lat-key',
    value: 'lat-value'
  };
  const queryLng = {
    key: 'lng-key',
    value: 'lng-value'
  };
  const queries = [queryLat, queryLng];
  const expected = `?${queryLat.key}=${queryLat.value}&${queryLng.key}=${queryLng.value}`;
  expect(queryBuilder(queries)).toBe(expected);
});