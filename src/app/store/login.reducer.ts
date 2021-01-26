import { createReducer, createFeatureSelector, createSelector, on, ActionReducer, MetaReducer  } from '@ngrx/store';
import { LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REDIRECT, LOGOUT_USER } from './login.actions';

const INITIAL_STATE = {
  username: '',
  token: '',
  error: ''
};

const _loginReducer = createReducer(
  INITIAL_STATE,
  on(LOGIN_START, (state) => state ),
  on(LOGIN_SUCCESS, (state, {username, token, error}) => ({ ...state, username: username, token: token, error: '' }) ),
  on(LOGIN_ERROR, (state, {error}) => ({ ...state, username: '', token: '', error: error })),
  on(LOGIN_REDIRECT, (state) => state),
  on(LOGOUT_USER,  () => INITIAL_STATE)
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}

export const daState = createFeatureSelector('login');

export const getUserName = (state) => state.username;
export const getToken = (state) => state.token;
export const getError = (state) => state.error;

export const getUserName1 = createSelector(daState, getUserName);
export const getToken1 = createSelector(daState, getToken);
export const getError1 = createSelector(daState, getError);

export const selectLoggedIn = createSelector(getUserName1, (user) => !!user);

export function getStorageReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {

    if (state === undefined) {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      if (username && token) {
        return {'login': { username: username, token: token, error: '', } };
      } else {
        return reducer(state, action);
      }
    }
    return reducer(state, action);
  };
}
