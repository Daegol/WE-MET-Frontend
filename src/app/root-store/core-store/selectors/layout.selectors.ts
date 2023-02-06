import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@we-met-app/root-store/root-state';
import * as fromLayout from '@we-met-app/root-store/core-store/reducers/layout.reducer'
import { coreFeatureKey, CoreState } from '../core-state';

export const selectCoreState = createFeatureSelector<State, CoreState>(
    coreFeatureKey
);

export const selectLayoutState = createSelector(
    selectCoreState,
    (state) => state.layout
)

export const selectShowSidenav = createSelector(
    selectLayoutState,
    fromLayout.selectShowSidenav
);

export const selectTitle = createSelector(
    selectLayoutState,
    fromLayout.selectTitle
);

export const selectCurrentUrl = createSelector(
    selectLayoutState,
    fromLayout.selectCurrentUrl
);

export const selectLayoutParams = createSelector(
    selectLayoutState,
    fromLayout.selectLayoutParams
)