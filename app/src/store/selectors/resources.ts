import { IResourcesBase } from 'utils/resourcesInterface';
import { AppState } from 'store';

export const getResource =
  (resourceName: keyof IResourcesBase) => (state: AppState) => {
    const resources = state.resources[resourceName];

    return resources;
  };

export const getResourceById =
  (resourceName: keyof IResourcesBase, id: number) => (state: AppState) =>
    state.resources[resourceName][id];
