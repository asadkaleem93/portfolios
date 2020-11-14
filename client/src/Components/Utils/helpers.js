export const uniqueValuesFromArray = array => array.filter((x, i, a) => a.indexOf(x) === i);
export const isObjEmpty = obj => {
  return Object.keys(obj).length === 0;
};
