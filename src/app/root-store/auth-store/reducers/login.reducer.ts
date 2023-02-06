import { AuthApiActions, LoginPageActions } from '@we-met-app/auth/actions';
import { createReducer, on } from '@ngrx/store';

export interface LoginState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginState = {
  error: null,
  pending: false,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: LoginState) => state.error;
export const getPending = (state: LoginState) => state.pending;
