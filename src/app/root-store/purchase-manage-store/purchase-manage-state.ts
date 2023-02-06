import { Action, combineReducers } from '@ngrx/store';
import { purchasesReducer, PurchasesState } from './reducers/purchases.reducer';

export const purchaseManageFeatureKey = 'purchase-manage';
export const purchasesFeatureKey = 'purchases';

export interface PurchaseManageState {
    [purchasesFeatureKey]: PurchasesState;
}

export function reducers(state: PurchaseManageState | undefined, action: Action) {
    return combineReducers({
        [purchasesFeatureKey]: purchasesReducer,
    })(state, action);
}

