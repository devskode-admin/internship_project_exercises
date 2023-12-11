/* eslint-disable no-prototype-builtins */

const PrepareDataForTable = (
  data = [],
  excludeFields = [],
  excludeMongoDbProperties = true,
  column,
) => {
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
        width: 150,
        editable: true,
      };
    })
    .filter((item) => item !== null);

  const itemsList = data.map((obj) => {
    const newItem = { ...obj };

    allExcludeFields.forEach((property) => {
      if (newItem.hasOwnProperty(property)) {
        delete newItem[property];
      }
    });

    return newItem;
  });

  return { columns: columnsList.concat(column), items: itemsList };
};

export default PrepareDataForTable;
