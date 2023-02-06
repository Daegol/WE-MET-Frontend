import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SteelScrapApiActions, SteelScrapPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface SteelScrapState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedSteelScrap: SubCategoryDto,
    selectedSteelScrapId: string;
    selectedSteelScraps: SubCategoryDto[],
    actionsSelectedSteelScrap: SubCategoryDto,
}

const initialState: SteelScrapState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedSteelScrap: null,
    selectedSteelScraps: [],
    selectedSteelScrapId: null,
    actionsSelectedSteelScrap: null,
});

export const steelScrapReducer = createReducer(
    initialState,

    on(SteelScrapPageActions.setSelectedSteelScraps, (state, { steelScraps }) => ({
        ...state,
        selectedSteelScraps: steelScraps as SubCategoryDto[]
    })),

    on(SteelScrapPageActions.setSelectedSteelScrap, (state, { steelScrap }) => ({
        ...state,
        selectedPersonnel: steelScrap
    })),
    on(SteelScrapPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(SteelScrapApiActions.loadAllSuccess, (state, { steelScraps }) => {
        return adapter.setAll(steelScraps, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(steelScraps.map((steelScrap) => steelScrap.name))]
        })
    }),
    on(SteelScrapApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(SteelScrapApiActions.loadOneSuccess, (state, { steelScraps }) => {
        return adapter.addOne(steelScraps, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(SteelScrapApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(SteelScrapApiActions.addOneSuccess, (state) => ({
        ...state,
        newSteelScrapPopupOpened: false,
        selectedSteelScraps: []
    })),
    on(SteelScrapApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(SteelScrapApiActions.updateOneSuccess, (state, { steelScrap }) => {
        return adapter.upsertOne(steelScrap, state);
    }),
    on(SteelScrapApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(SteelScrapApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedSteelScraps: []
        });
    }),
    on(SteelScrapApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(SteelScrapPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedSteelScraps: state.selectedSteelScraps.filter((steelScraps) => steelScraps.id !== id)
    })),
    on(SteelScrapPageActions.setActionsSelectedSteelScrap, (state, { steelScrap }) => ({
        ...state,
        actionsSelectedSteelScrap: steelScrap
    })),
);

export const getLoaded = (state: SteelScrapState) => state.loaded;

export const getLoading = (state: SteelScrapState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectSteelScrapsNames = (state: SteelScrapState) => state.names.slice().sort();

export const getSelectedRow = (state: SteelScrapState) => state.selectedSteelScrap;

export const getSelectedSteelScraps = (state: SteelScrapState) => state.selectedSteelScraps.slice();

export const getActionsSelectedSteelScrap = (state: SteelScrapState) => state.actionsSelectedSteelScrap;

export const getEntityById = (id: string) => (state: SteelScrapState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}