import { createFeatureSelector } from '@ngrx/store';
import { State } from '@we-met-app/root-store/root-state';
import { purchaseManageFeatureKey } from '../purchase-manage-state';
import { PurchaseManageStore } from '@we-met-app/root-store';

export const selectPurchaseManageState = createFeatureSelector<State, PurchaseManageStore.PurchaseManageState>(
    purchaseManageFeatureKey
);