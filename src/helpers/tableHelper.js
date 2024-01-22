// Specify the fields you want to exclude
const excludedFields = ['_id', 'createdAt', 'updatedAt', 'password', '__v', 'technologies'];

export const createColumns = (data) => {
  const transformedData = data?.map((item) =>
    Object.keys(item)
      .filter((key) => !excludedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {}),
  );
  const keys = Object.keys(transformedData[0]);
  const modifiedKeys = keys.map((item) => {
    // Replace underscores with spaces and capitalize the first letter
    const modifiedStr = item
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
    return modifiedStr;
  });
  modifiedKeys.push('Actions');
  return modifiedKeys;
};

export const transformedFields = (value) => {
  return Object.entries(value).filter(([field]) => !excludedFields.includes(field));
};
