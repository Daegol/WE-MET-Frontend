import { Action, combineReducers } from '@ngrx/store';
import { layoutReducer, LayoutState } from './reducers/layout.reducer';

export const layoutFeatureKey = 'layout';
export const coreFeatureKey = 'core';

export interface CoreState {
    [layoutFeatureKey]: LayoutState;
}

export function reducers(state: CoreState | undefined, action: Action) {
    return combineReducers({
        [layoutFeatureKey]: layoutReducer,
    })(state, action);
}
