export const USERS_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export const USER_POST_REQUESTED = 'USER_POST_REQUESTED';
export const USER_DELETE_REQUESTED = 'USER_DELETE_REQUESTED';
export const USER_PATCH_REQUESTED = 'USER_PATCH_REQUESTED';
const USERS_FETCH_SUCCEEDED = 'USERS_FETCH_SUCCEEDED';
const USER_POST_SUCCEEDED = 'USER_POST_SUCCEEDED';
const USER_DELETE_SUCCEEDED = 'USER_DELETE_SUCCEEDED';
const USER_PATCH_SUCCEEDED = 'USER_PATCH_SUCCEEDED';
const REQUEST_LOADING = 'REQUEST_LOADING';
const REQUEST_ERROR = 'REQUEST_ERROR';

const initialState = { users: [], isLoading: false, error: null };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCEEDED:
      return { ...state, users: action.payload };
    case USER_POST_SUCCEEDED:
      return { ...state, users: [...state.users, action.payload] };
    case REQUEST_LOADING:
      return { ...state, isLoading: action.payload };
    case REQUEST_ERROR:
      return { ...state, error: action.payload };
    case USER_DELETE_SUCCEEDED:
      return { ...state, users: state.users.filter((u) => u.id !== action.payload) };
    case USER_PATCH_SUCCEEDED: {
      const usersUpdated = state.users.map((u) => {
        if (u.id === action.payload) {
          return action.payload;
        }
        return u;
      });
      return { ...state, users: usersUpdated };
    }
    default:
      return state;
  }
};

// ACTIONS

export const setLoading = (bool) => ({ type: REQUEST_LOADING, payload: bool });
export const setError = (err) => ({ type: REQUEST_ERROR, payload: err });

export const getUsers = () => ({ type: USERS_FETCH_REQUESTED });
export const sendUser = (payload) => ({ type: USER_POST_REQUESTED, payload });
export const deleteConfirmation = (payload) => ({ type: USER_DELETE_REQUESTED, payload });
export const updateConfirmation = (payload) => ({ type: USER_PATCH_REQUESTED, payload });
export const setUsers = (users) => ({ type: USERS_FETCH_SUCCEEDED, payload: users });
export const setUser = (userData) => ({ type: USER_POST_SUCCEEDED, payload: userData });
export const deleteUser = (id) => ({ type: USER_DELETE_SUCCEEDED, payload: id });
export const updateUser = (data) => ({ type: USER_DELETE_SUCCEEDED, payload: data });

export default usersReducer;
