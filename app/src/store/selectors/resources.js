export const getResource = (resourceName) => (state) => {
  const resources = state.resources[resourceName];

  return resources;
};

export const getResourceById = (resourceName, id) => (state) =>
  state.resources[resourceName][id];
