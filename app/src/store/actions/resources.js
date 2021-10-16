import axios from '../../utils/axios';

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

export const addData = (resourceName) => (payload) => async (dispatch) => {
  const { data } = await axios.post(`/${resourceName}`, payload, {
    headers: {
      resourceName,
    },
  });

  return dispatch(updateResource(resourceName, { id: data.id, data }));
};

export const getAllData =
  (resourceName, query = '', overwrite = true) =>
  async () => {
    await axios.get(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });
  };

export const getDataById =
  (resourceName, id, query = '', overwrite = false) =>
  async () => {
    const { data } = await axios.get(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

export const updateData =
  (resourceName) =>
  (id, update, query = '') =>
  async () => {
    const { data } = await axios.patch(
      `/${resourceName}/${id}?${query}`,
      update,
      {
        headers: {
          resourceName,
        },
      }
    );
    return data;
  };

export const deleteData = (resourceName, id) => async (dispatch) => {
  await axios.delete(`/${resourceName}/${id}`);

  return dispatch(updateResource(resourceName, id));
};

export const login = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/users/login', payload);

    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('id', data.id);

    //Get current user data
    const { data: currentUser } = await axios.get(`/users/${data.id}`);

    console.log(currentUser);
  } catch (err) {
    throw err;
  }
};
