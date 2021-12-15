import { AppDispatch } from 'store';
import axios from 'utils/axios';
import { IResourcesBase, ResourcesPropsAll } from 'utils/resourcesInterface';

interface IUpdateResource {
  id: number;
  data: ResourcesPropsAll;
}

export const setResource = (
  resourceName: keyof IResourcesBase,
  payload: ResourcesPropsAll
) => ({
  type: `resources.${resourceName}.set`,
  payload, // data
});

export const updateResource = (
  resourceName: keyof IResourcesBase,
  payload?: IUpdateResource | number
) => ({
  type: `resources.${resourceName}.update`,
  payload, // { id, data }
});

export const overwriteResource = (
  resourceName: keyof IResourcesBase,
  payload: ResourcesPropsAll[]
) => ({
  type: `resources.${resourceName}.overwrite`,
  payload,
});

export const deleteResource = (
  resourceName: keyof IResourcesBase,
  payload: { id: number }
) => ({
  type: `resources.${resourceName}.delete`,
  payload, // id
});

export const addData =
  (resourceName: keyof IResourcesBase) =>
  (payload: ResourcesPropsAll) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post(`/${resourceName}`, payload, {
      headers: {
        resourceName,
      },
    });

    return dispatch(updateResource(resourceName, { id: data.id, data }));
  };

export const getAllData =
  (resourceName: keyof IResourcesBase, query = '', overwrite = true) =>
  async () => {
    await axios.get(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        // @ts-ignore
        overwrite,
      },
    });
  };

export const getDataById =
  (
    resourceName: keyof IResourcesBase,
    id: number,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.get(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        // @ts-ignore
        overwrite,
      },
    });

    return data;
  };

export const updateData =
  (resourceName: keyof IResourcesBase) =>
  (id: number, update: Partial<ResourcesPropsAll>, query = '') =>
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

export const deleteData =
  (resourceName: keyof IResourcesBase, id: number) =>
  async (dispatch: AppDispatch) => {
    await axios.delete(`/${resourceName}/${id}`);

    return dispatch(updateResource(resourceName, id));
  };
