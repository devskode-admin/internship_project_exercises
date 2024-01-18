const fieldsBlocked = ['_id', '__v', 'createdAt', 'updatedAt', 'password'];

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

export const organiceData = (value) => {
  return Object.entries(value).filter(([field]) => !fieldsBlocked.includes(field));
};
