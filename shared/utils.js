export const HTTP = 'http://';
export const HTTPS = 'https://';
export const SERVER_ADDR = 'ec2-52-78-96-168.ap-northeast-2.compute.amazonaws.com';
export const ENDPOINT_ITEM = '/api/items';
export const ENDPOINT_IMAGE = '/api/images';
export const ENDPOINT_USER = '/api/users';
export const createQueryObject = (key, value) => {
  return {key, value};
};
export const queryBuilder = (arr) => {
  /* arr is array of Object which form is {key:-, value:-} */
  const strings = arr.map((obj) => {
    return `${obj.key.toString()}=${obj.value.toString()}`;
  });
  const queryString = strings.reduce((first, second) => {
    return `${first}&${second}`;
  });
  return `?${queryString}`;
};