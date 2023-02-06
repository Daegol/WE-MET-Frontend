import { Action, createReducer, on } from '@ngrx/store';

import { LayoutActions, UserActions } from '@we-met-app/core/actions';
import { AuthActions, AuthApiActions } from '@we-met-app/auth/actions';

export interface State {
  showSidenav: boolean;
  title: string;
  currentUrl: string;
  timeoutWarning: boolean;
  isLoggedIn: boolean;
}

const initialState: State = {
  showSidenav: true,
  title: "WE-MET",
  currentUrl: "",
  timeoutWarning: false,
  isLoggedIn: false
};

export interface LayoutParams {
  timeoutWarning: boolean,
  isLoggedIn: boolean
}

const layoutReducer = createReducer(
  initialState,
  // Even thought the `state` is unused, it helps infer the return type
  on(LayoutActions.toggleSidenav, (state: State) => ({ ...state, showSidenav: !state.showSidenav })),
  on(LayoutActions.openSidenav, (state: State) => ({ ...state, showSidenav: true })),
  on(LayoutActions.setTitle, (state: State, { title }) => ({ ...state, title: title })),
  on(LayoutActions.setCurrentUrl, (state: State, { url }) => ({ ...state, currentUrl: url })),
  on(UserActions.idleTimeoutWarning, (state: State) => ({ ...state, timeoutWarning: true })),
  on(UserActions.idleTimeoutWarningDismiss, (state: State) => ({ ...state, timeoutWarning: false })),
  on(AuthActions.logout, (state: State) => ({ ...state, isLoggedIn: false })),
  on(AuthApiActions.loginSuccess, (state: State) => ({ ...state, isLoggedIn: true })),
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}

export const selectShowSidenav = (state: State) => state.showSidenav;
export const selectTitle = (state: State) => state.title;
export const selectCurrentUrl = (state: State) => state.currentUrl;
export const selectLayoutParams = (state: State) => [{ isLoggedIn: state.isLoggedIn, timeoutWarning: state.timeoutWarning }];
