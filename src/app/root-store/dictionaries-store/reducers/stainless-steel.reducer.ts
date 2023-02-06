import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { StainlessSteelApiActions, StainlessSteelPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface StainlessSteelState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedStainlessSteel: SubCategoryDto,
    selectedStainlessSteelId: string;
    selectedStainlessSteels: SubCategoryDto[],
    actionsSelectedStainlessSteel: SubCategoryDto,
}

const initialState: StainlessSteelState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedStainlessSteel: null,
    selectedStainlessSteels: [],
    selectedStainlessSteelId: null,
    actionsSelectedStainlessSteel: null,
});

export const stainlessSteelReducer = createReducer(
    initialState,

    on(StainlessSteelPageActions.setSelectedStainlessSteels, (state, { stainlessSteels }) => ({
        ...state,
        selectedStainlessSteels: stainlessSteels as SubCategoryDto[]
    })),

    on(StainlessSteelPageActions.setSelectedStainlessSteel, (state, { stainlessSteel }) => ({
        ...state,
        selectedPersonnel: stainlessSteel
    })),
    on(StainlessSteelPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(StainlessSteelApiActions.loadAllSuccess, (state, { stainlessSteels }) => {
        return adapter.setAll(stainlessSteels, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(stainlessSteels.map((stainlessSteel) => stainlessSteel.name))]
        })
    }),
    on(StainlessSteelApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StainlessSteelApiActions.loadOneSuccess, (state, { stainlessSteels }) => {
        return adapter.addOne(stainlessSteels, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(StainlessSteelApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StainlessSteelApiActions.addOneSuccess, (state) => ({
        ...state,
        newStainlessSteelPopupOpened: false,
        selectedStainlessSteels: []
    })),
    on(StainlessSteelApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StainlessSteelApiActions.updateOneSuccess, (state, { stainlessSteel }) => {
        return adapter.upsertOne(stainlessSteel, state);
    }),
    on(StainlessSteelApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StainlessSteelApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedStainlessSteels: []
        });
    }),
    on(StainlessSteelApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StainlessSteelPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedStainlessSteels: state.selectedStainlessSteels.filter((stainlessSteels) => stainlessSteels.id !== id)
    })),
    on(StainlessSteelPageActions.setActionsSelectedStainlessSteel, (state, { stainlessSteel }) => ({
        ...state,
        actionsSelectedStainlessSteel: stainlessSteel
    })),
);

export const getLoaded = (state: StainlessSteelState) => state.loaded;

export const getLoading = (state: StainlessSteelState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectStainlessSteelsNames = (state: StainlessSteelState) => state.names.slice().sort();

export const getSelectedRow = (state: StainlessSteelState) => state.selectedStainlessSteel;

export const getSelectedStainlessSteels = (state: StainlessSteelState) => state.selectedStainlessSteels.slice();

export const getActionsSelectedStainlessSteel = (state: StainlessSteelState) => state.actionsSelectedStainlessSteel;

export const getEntityById = (id: string) => (state: StainlessSteelState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}