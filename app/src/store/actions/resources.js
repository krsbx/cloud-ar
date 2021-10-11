export const setResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.set`,
  payload, // data
});

export const updateResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.update`,
  payload, // { id, data }
});

export const overwriteResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.overwrite`,
  payload,
});

export const deleteResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.delete`,
  payload, // id
});
