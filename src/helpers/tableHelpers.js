const columnsBlocked = ['_id', '__v', 'createdAt', 'updatedAt', 'password', 'technologies'];
const fieldsBlocked = ['__v', 'createdAt', 'updatedAt', 'password', 'technologies'];


export const getColumnNames = (list) => {
  const fieldNamesFiltered = Object.keys(list).filter((field) => !columnsBlocked.includes(field));
  const columns = fieldNamesFiltered.map((columnName) => ({
    field: columnName,
    headerName: transformName(columnName),
    flex: 1,
  }));
  return columns;
};

export const transformData = (data) => {
  return data.map((item) => {
    const transformedItem = { _id: item._id };

    Object.entries(item).forEach(([field, value]) => {
      if (field !== '_id' && !columnsBlocked.includes(field)) {
        transformedItem[transformName(field)] = value;
      }
    });

    return transformedItem;
  });
};

const transformName = (name) => {
  const partes = name.split('_');
  const nameTransformed = partes
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return nameTransformed;
};

export const organiceData = (dataArray, idField = '_id') => {
  return dataArray.map((item) => {
    const transformedItem = { id: item[idField] };

    Object.entries(item).forEach(([field, value]) => {
      if (field !== idField && !fieldsBlocked.includes(field)) {
        transformedItem[field] = value;
      }
    });

    return transformedItem;
  });
};
