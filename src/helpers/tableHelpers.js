/* eslint-disable max-len */
/**
 * fieldsBlocked is used to select the properties that we do not want to show in the table.
 * @type {Array<String>}
 */
const fieldsBlocked = ['_id', '__v', 'createdAt', 'updatedAt', 'password'];

/**
 * getColumnNames is a function that is in charge of manipulating the data received so that the dataGrid.
 * @param {Array} list It expects an array of objects to manipulate.
 * @returns returns an array of objects with the properties needed by the dataGrid.
 */

export const getColumnNames = (list) => {
  const fieldNamesFiltered = Object.keys(list).filter((name) => !fieldsBlocked.includes(name));

  return fieldNamesFiltered.map((fieldName) => ({
    field: fieldName,
    headerName: transformName(fieldName),
    width: 190,
  }));
};

const transformName = (name) => {
  const partes = name.split('_');
  const nameTransformed = partes
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return nameTransformed;
};
