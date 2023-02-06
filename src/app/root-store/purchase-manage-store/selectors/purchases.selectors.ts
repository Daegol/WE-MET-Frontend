
import * as fromPurchases from '@we-met-app/root-store/purchase-manage-store/reducers/purchases.reducer';
import { PurchaseDto } from '@we-met-app/api/models';
import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectPurchaseManageState } from './purchase-manage.selectors';

export const selectPurchasesState = createSelector(
    selectPurchaseManageState,
    (state) => state.purchases
)

export const selectActionsSelectedPurchase = createSelector(
    selectPurchasesState,
    fromPurchases.getActionsSelectedPurchase
)

export const selectPurchases = createSelector(
    selectPurchasesState,
    fromPurchases.selectAll
)

export const selectSelectedPurchases = createSelector(
    selectPurchasesState,
    fromPurchases.getSelectedPurchases
)

export const selectIsNewPurchasePopupVisible = createSelector(
    selectPurchasesState,
    fromPurchases.getNewPurchasePopupVisible
)

export const selectPurchaseEntities = createSelector(
    selectPurchasesState,
    fromPurchases.selectEntities
)

export const getPurchaseById = () => {
    return createSelector(
        selectPurchaseEntities,
        (entities: Dictionary<PurchaseDto>, props: { id: string }) => {
            return entities[props.id]
        },
    )
}

export const selectRow = createSelector(
    selectPurchasesState,
    fromPurchases.getSelectedRow
)

export const selectStatusesNames = createSelector(
    selectPurchasesState,
    fromPurchases.selectStatusesNames
)

export const selectPurchasesParams = createSelector(
    selectPurchasesState,
    fromPurchases.getPurchasesParams
)

