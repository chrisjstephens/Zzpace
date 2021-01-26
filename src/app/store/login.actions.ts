import { createAction, props } from '@ngrx/store';

export const LOGIN_START = createAction('login_start', props<{formData}>());
export const LOGIN_ERROR = createAction('login_error', props<{error}>());
export const LOGIN_SUCCESS = createAction('login_success', props<{username, token, error}>());
export const LOGIN_REDIRECT = createAction('login_redirect');
export const LOGOUT_USER = createAction('logout_user');
