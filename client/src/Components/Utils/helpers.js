export const uniqueValuesFromArray = (array) =>
  array.filter((x, i, a) => a.indexOf(x) === i);
export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
