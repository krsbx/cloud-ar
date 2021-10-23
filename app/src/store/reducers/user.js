import { USER_ROLE } from '../../utils/constant';

export const SET_USER = 'user.set';
export const DEL_USER = 'user.delete';

export const initialState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  status: '',
  isAdmin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.data,
        isAdmin: action.data.role === USER_ROLE.ADMIN,
      };
    case DEL_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
