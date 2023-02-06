import { Action, combineReducers } from '@ngrx/store';
import { userReducer, UserState } from './reducers/auth.reducer';
import { loginReducer, LoginState } from './reducers/login.reducer';

export const authFeatureKey = 'auth';
export const userFeatureKey = 'user';
export const loginFeatureKey = 'login';

export interface AuthState {
    [userFeatureKey]: UserState;
    [loginFeatureKey]: LoginState;
}

export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({
        [userFeatureKey]: userReducer,
        [loginFeatureKey]: loginReducer,
    })(state, action);
}