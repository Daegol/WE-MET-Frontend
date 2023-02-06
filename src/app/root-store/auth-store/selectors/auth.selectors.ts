import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from '../auth-state';
import { State } from '@we-met-app/root-store/root-state';
import * as fromAuth from '@we-met-app/root-store/auth-store/reducers/auth.reducer'

export const selectAuthState = createFeatureSelector<State, AuthState>(
    authFeatureKey
);

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state) => state.user
);
export const selectUser = createSelector(
    selectAuthStatusState,
    fromAuth.getUser
);