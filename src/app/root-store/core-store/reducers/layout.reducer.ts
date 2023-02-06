import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '@we-met-app/auth/actions';

import { LayoutActions, UserActions } from '@we-met-app/core/actions';

export const layoutFeatureKey = 'layout';

export interface LayoutState {
  showSidenav: boolean;
  title: string;
  currentUrl: string;
  timeoutWarning: boolean;
  isLoggedIn: boolean;
}

const initialState: LayoutState = {
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

export const layoutReducer = createReducer(
  initialState,
  // Even thought the `state` is unused, it helps infer the return type
  on(LayoutActions.toggleSidenav, (state: LayoutState) => ({ ...state, showSidenav: !state.showSidenav })),
  on(LayoutActions.openSidenav, (state: LayoutState) => ({ ...state, showSidenav: true })),
  on(LayoutActions.setTitle, (state: LayoutState, { title }) => ({ ...state, title: title })),
  on(LayoutActions.setCurrentUrl, (state: LayoutState, { url }) => ({ ...state, currentUrl: url })),
  on(UserActions.idleTimeoutWarning, (state: LayoutState) => ({ ...state, timeoutWarning: true })),
  on(UserActions.idleTimeoutWarningDismiss, (state: LayoutState) => ({ ...state, timeoutWarning: false })),
  on(AuthActions.logout, (state: LayoutState) => ({ ...state, isLoggedIn: false })),
  on(AuthApiActions.loginSuccess, (state: LayoutState) => ({ ...state, isLoggedIn: true })),
);



export const selectShowSidenav = (state: LayoutState) => state.showSidenav;
export const selectTitle = (state: LayoutState) => state.title;
export const selectCurrentUrl = (state: LayoutState) => state.currentUrl;
export const selectLayoutParams = (state: LayoutState) => [{ isLoggedIn: state.isLoggedIn, timeoutWarning: state.timeoutWarning }];
