import { Action, combineReducers } from '@ngrx/store';

export const myPageFeatureKey = 'myPage';

export interface MyPageState {
}

export function reducers(state: MyPageState | undefined, action: Action) {
    return combineReducers({
    })(state, action);
}

