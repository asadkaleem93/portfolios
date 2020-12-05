export const uniqueValuesFromArray = (array) =>
  array.filter((x, i, a) => a.indexOf(x) === i);
export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key,
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
};

export const jsonToFormData = (data) => {
  const formData = new FormData();

  buildFormData(formData, data, "data");

  return formData;
};
