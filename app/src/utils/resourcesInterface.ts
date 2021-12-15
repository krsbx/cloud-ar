interface IParamListBase {
  [key: string]: object | undefined;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
}

export interface IMarker {
  id: number;
  name: string;
  width: number;
  marker: string;
  metadata: string;
}

export type IResourcesId = {
  users: {
    [id: number]: IUser;
  };
  markers: {
    [id: number]: IMarker;
  };
};

export type IResourcesBase = {
  users: IUser;
  markers: IMarker;
};

export type SelectedResource<
  ParamList extends IParamListBase,
  ResourceName extends keyof ParamList = keyof ParamList
> = ParamList[ResourceName];

// Specific one resource
export type ResourceProps<T extends keyof IResourcesBase> = SelectedResource<
  IResourcesBase,
  T
>;

// Specific one resources
export type ResourcesProps<T extends keyof IResourcesId> = SelectedResource<
  IResourcesId,
  T
>;

export type ResourcesPropsAll = IUser | IMarker;

export type ResourcePropsAllId = ResourcesProps<'markers' | 'users'>;
