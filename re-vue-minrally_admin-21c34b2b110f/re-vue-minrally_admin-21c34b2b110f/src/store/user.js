import { createSlice } from '@reduxjs/toolkit';
import { getCredentials, revokeUser, setCredentials } from '@utils/cookie';

const initialCredentials = getCredentials() || null;
const initIsLogin = !!getCredentials() || false;

const slice = createSlice({
  name: 'user',
  initialState: {
    credentials: initialCredentials,
    isLogin: initIsLogin
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.credentials = action?.payload;
      setCredentials(action?.payload);
    },
    logoutSuccess: state => {
      state.credentials = null;
      state.isLogin = false;
      revokeUser();
    }
  }
});

export default slice.reducer;

const { loginSuccess, logoutSuccess } = slice.actions;

export const login = credentials => async dispatch => {
  dispatch(loginSuccess(credentials));
};

export const logout = () => {
  return async dispatch => {
    dispatch(logoutSuccess());
  };
};
