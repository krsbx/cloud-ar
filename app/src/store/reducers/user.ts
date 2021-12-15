// Interface for current logged in user
interface ICurrentUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role?: 'admin' | 'user';
  isAdmin: boolean;
}

export const SET_USER = 'user.set';
export const DEL_USER = 'user.delete';

interface IAction {
  type: 'user.set' | 'user.delete';
  data: ICurrentUser;
}

export const initialState: ICurrentUser = {
  id: undefined,
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  role: undefined,
  isAdmin: false,
};

const reducer = (state: ICurrentUser = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.data,
        isAdmin: action.data.role === 'admin',
      };
    case DEL_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
