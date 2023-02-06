import { createSelector } from '@ngrx/store';
import { selectAuthState, selectUser } from './auth.selectors';
import * as fromLogin from '@we-met-app/root-store/auth-store/reducers/login.reducer'

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state) => state.login
);
export const selectLoginPageError = createSelector(
    selectLoginPageState,
    fromLogin.getError
);
export const selectLoginPagePending = createSelector(
    selectLoginPageState,
    fromLogin.getPending
);