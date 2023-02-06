import { Action, combineReducers } from '@ngrx/store';
import { personnelReducer, PersonnelState } from './reducers/personnel.reducer';

export const administrationFeatureKey = 'administration';
export const personnelFeatureKey = 'personnel';

export interface AdministrationState {
    [personnelFeatureKey]: PersonnelState;
}

export function reducers(state: AdministrationState | undefined, action: Action) {
    return combineReducers({
        [personnelFeatureKey]: personnelReducer,
    })(state, action);
}




