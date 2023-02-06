import { createAction, props } from '@ngrx/store';
import { PurchaseDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[Purchases Page] Get Purchases List'
);

export const getAllFromFlights = createAction(
    '[Flights Page] Get Purchases List'
);

export const removeOne = createAction(
    '[Purchases Page] Remove one Purchase',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[Purchases Page] Remove many Purchases',
    props<{ purchases: PurchaseDto[] }>()
);

export const setInitialSquadrons = createAction(
    '[Purchases Init] Set Initial Squadrons',
    props<{ ids: string[] }>()
);

export const setCurrentSquadrons = createAction(
    '[Purchases Init] Set Current Squadrons',
    props<{ ids: string[] }>()
);

export const setInitialStatuses = createAction(
    '[Purchases Init] Set Initial Statuses',
    props<{ ids: string[] }>()
);

export const setCurrentStatuses = createAction(
    '[Purchases Init] Set Current Statuses',
    props<{ ids: string[] }>()
);

export const createNew = createAction(
    '[Purchases Page] Create new Purchase',
    props<{ purchase: PurchaseDto }>()
);

export const openNewDialog = createAction(
    '[Purchases Page] Open new Purchase popup'
);

export const closeNewDialog = createAction(
    '[Purchases Page] Close new Purchase popup'
);

export const setSelectedPurchase = createAction(
    '[Purchases Page] Set Selected Row',
    props<{ purchase: PurchaseDto }>()
);

export const setSelectedPurchases = createAction(
    '[Purchases Page] Set Selected Purchases',
    props<{ purchases: PurchaseDto[] }>()
);

export const setActionsSelectedPurchase = createAction(
    '[Purchases Page] Set Actions Selected Purchase',
    props<{ purchase: PurchaseDto }>()
);

export const openEditDialog = createAction(
    '[Purchases Page] Open Edit Purchase popup'
);

export const closeEditDialog = createAction(
    '[Purchases Page] Close Edit Purchase popup'
);

export const openDeleteDialog = createAction(
    '[Purchases Page] Open Delete Purchase popup',
    props<{ isMenuAction: boolean }>()
);

export const closeDeleteDialog = createAction(
    '[Purchases Page] Close Delete Purchase popup'
);

export const removeOneFromSelected = createAction(
    '[Purchases Page] Remove one selected Purchase',
    props<{ id: number }>()
);

export const deleteOperation = createAction(
    '[Purchases Page] Delete Operation',
    props<{ purchases: PurchaseDto[] }>()
);

export const deleteConfirmation = createAction(
    '[Purchases Page] Delete Confirmation',
    props<{ purchases: PurchaseDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Purchases Page] Delete Confirmation Dismiss'
);

//dictionaries
export const getAllFromPurchasesDetails = createAction(
    '[Purchases Page] Get Localizations List',
)
