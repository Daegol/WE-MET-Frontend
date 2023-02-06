import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PurchaseDto } from '@we-met-app/api/models';
import { PurchasesApiActions, PurchasesPageActions } from '@we-met-app/purchase/actions';

export const adapter: EntityAdapter<PurchaseDto> = createEntityAdapter<PurchaseDto>();

export interface PurchasesState extends EntityState<PurchaseDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    statuses: string[];
    selectedPurchase: PurchaseDto,
    actionsSelectedPurchase: PurchaseDto,
    selectedPurchases: PurchaseDto[],
    selectedPurchaseId: string;
    newPurchasePopupOpened: boolean;
    deletePurchasesPopupOpened: boolean;
    purchasesParams: PurchasesParams;
}

export const initialState: PurchasesState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    statuses: [],
    selectedPurchase: null,
    actionsSelectedPurchase: null,
    selectedPurchases: [],
    selectedPurchaseId: null,
    newPurchasePopupOpened: false,
    deletePurchasesPopupOpened: false,
    purchasesParams: {
        currentSquadronIds: [],
        currentStatusIds: []
    }
});

export interface PurchasesParams {
    currentSquadronIds: string[];
    currentStatusIds: string[];
}

export const purchasesReducer = createReducer(
    initialState,
    on(PurchasesPageActions.setInitialSquadrons, (state, { ids }) => ({
        ...state,
        purchasesParams: {
            ...state.purchasesParams,
            currentSquadronIds: (state.purchasesParams.currentSquadronIds === null || state.purchasesParams.currentSquadronIds === []) ? ids : state.purchasesParams.currentSquadronIds
        }
    })),
    on(PurchasesPageActions.setCurrentSquadrons, (state, { ids }) => ({
        ...state,
        purchasesParams: {
            ...state.purchasesParams,
            currentSquadronIds: ids
        },
    })),
    on(PurchasesPageActions.setInitialStatuses, (state, { ids }) => ({
        ...state,
        purchasesParams: {
            ...state.purchasesParams,
            currentStatusIds: (state.purchasesParams.currentStatusIds === null || state.purchasesParams.currentStatusIds === []) ? ids : state.purchasesParams.currentStatusIds
        }
    })),
    on(PurchasesPageActions.setCurrentStatuses, (state, { ids }) => ({
        ...state,
        purchasesParams: {
            ...state.purchasesParams,
            currentStatusIds: ids
        },
    })),
    // on(PurchasesPageActions.setSelectedPurchase, (state, { purchase }) => ({
    //   ...state,
    //   selectedSquadron: purchase as PurchaseDto
    // })),
    on(PurchasesPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(PurchasesPageActions.getAll, (state) => {
        return adapter.removeAll({ ...state, loading: true });
    }),
    on(PurchasesPageActions.removeOne, (state) => ({
        ...state,
        loading: true,
    })),
    on(PurchasesApiActions.removeOneSuccess, (state) => ({
        ...state,
        selectedPurchases: []
    })),
    on(PurchasesPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedPurchases: state.selectedPurchases.filter((purchase) => purchase.id !== id)
    })),
    on(PurchasesPageActions.openNewDialog, (state) => ({
        ...state,
        newPurchasePopupOpened: true
    })),
    on(PurchasesPageActions.closeNewDialog, (state) => ({
        ...state,
        newPurchasePopupOpened: false
    })),
    on(PurchasesPageActions.createNew, (state, { }) => ({
        ...state
    })),
    on(PurchasesApiActions.addOneSuccess, (state) => ({
        ...state,
        newPurchasePopupOpened: false,
        selectedPurchases: [],
    })),
    on(PurchasesApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(PurchasesApiActions.removeOneSuccess, (state, { id }) => {
        if (id == state.selectedPurchase?.id) {
            return adapter.removeOne(id, { ...state, selectedPurchase: null });
        }
        return adapter.removeOne(id, state);
    }),
    on(PurchasesApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(PurchasesApiActions.updateOneSuccess, (state, { purchase }) => {
        return adapter.upsertOne(purchase, state);
    }),
    on(PurchasesApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(PurchasesApiActions.loadAllSuccess, (state, { purchases }) => {
        return adapter.setAll(purchases, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(PurchasesApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(PurchasesPageActions.setActionsSelectedPurchase, (state, { purchase }) => ({
        ...state,
        actionsSelectedPurchase: purchase as PurchaseDto
    })),
    on(PurchasesPageActions.setSelectedPurchase, (state, { purchase }) => ({
        ...state,
        selectedPurchase: purchase
    })),
    on(PurchasesPageActions.setSelectedPurchases, (state, { purchases }) => ({
        ...state,
        selectedPurchases: purchases as PurchaseDto[]
    })),
    on(PurchasesPageActions.openDeleteDialog, (state) => ({
        ...state,
        deletePurchasesPopupOpened: true
    })),
    on(PurchasesPageActions.closeDeleteDialog, (state) => ({
        ...state,
        deletePurchasesPopupOpened: false
    })),
    on(PurchasesApiActions.loadOneSuccess, (state, { purchases }) => {
        return adapter.addOne(purchases, {
            ...state,
            loaded: true,
            loading: false
        })
    }),

);


export const getLoaded = (state: PurchasesState) => state.loaded;

export const getLoading = (state: PurchasesState) => state.loading;

export const getSelectedRow = (state: PurchasesState) => state.selectedPurchase;

export const getSelectedPurchases = (state: PurchasesState) => state.selectedPurchases.slice();

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const getNewPurchasePopupVisible = (state: PurchasesState) => state.newPurchasePopupOpened;

export const getActionsSelectedPurchase = (state: PurchasesState) => state.actionsSelectedPurchase;

export const getDeletePurchasesPopupVisible = (state: PurchasesState) => state.deletePurchasesPopupOpened;

export const selectStatusesNames = (state: PurchasesState) => state.statuses.slice().sort();

export const getEntityById = (id: string) => (state: PurchasesState) => state.entities[id];

export const getPurchasesParams = (state: PurchasesState) => state.purchasesParams;