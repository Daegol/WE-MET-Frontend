
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthActions } from '@we-met-app/auth/actions';
import { User } from '@we-met-app/auth/models';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: UserState) => state.user;
