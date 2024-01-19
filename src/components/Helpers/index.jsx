/* eslint-disable no-prototype-builtins */
const dataForTable = (data = [], excludeFields = [], excludeMongoDbProperties = true) => {
  const item = data ? data[0] : [];
  const fieldNames = item ? Object.keys(item) : [];

  const mongoDbProperties = ['createdAt', 'updatedAt', '__v'];
  const allExcludeFields = excludeMongoDbProperties
    ? [...mongoDbProperties, ...excludeFields]
    : excludeFields;

  const columnsList = fieldNames
    .map((field) => {
      if (allExcludeFields && allExcludeFields.includes(field)) {
        return null;
      }

      const headerName = field
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        field,
        headerName,
      };
    })
    .filter((item) => item !== null);

  return {
    columns: columnsList,
    items: data,
  };
};

export default dataForTable;
