import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { CopperApiActions, CopperPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface CopperState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedCopper: SubCategoryDto,
    selectedCopperId: string;
    selectedCoppers: SubCategoryDto[],
    actionsSelectedCopper: SubCategoryDto,
}

const initialState: CopperState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedCopper: null,
    selectedCoppers: [],
    selectedCopperId: null,
    actionsSelectedCopper: null,
});

export const copperReducer = createReducer(
    initialState,

    on(CopperPageActions.setSelectedCoppers, (state, { coppers }) => ({
        ...state,
        selectedCoppers: coppers as SubCategoryDto[]
    })),

    on(CopperPageActions.setSelectedCopper, (state, { copper }) => ({
        ...state,
        selectedPersonnel: copper
    })),
    on(CopperPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(CopperApiActions.loadAllSuccess, (state, { coppers }) => {
        return adapter.setAll(coppers, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(coppers.map((copper) => copper.name))]
        })
    }),
    on(CopperApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CopperApiActions.loadOneSuccess, (state, { coppers }) => {
        return adapter.addOne(coppers, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(CopperApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CopperApiActions.addOneSuccess, (state) => ({
        ...state,
        newCopperPopupOpened: false,
        selectedCoppers: []
    })),
    on(CopperApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CopperApiActions.updateOneSuccess, (state, { copper }) => {
        return adapter.upsertOne(copper, state);
    }),
    on(CopperApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CopperApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedCoppers: []
        });
    }),
    on(CopperApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CopperPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedCoppers: state.selectedCoppers.filter((coppers) => coppers.id !== id)
    })),
    on(CopperPageActions.setActionsSelectedCopper, (state, { copper }) => ({
        ...state,
        actionsSelectedCopper: copper
    })),
);

export const getLoaded = (state: CopperState) => state.loaded;

export const getLoading = (state: CopperState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectCoppersNames = (state: CopperState) => state.names.slice().sort();

export const getSelectedRow = (state: CopperState) => state.selectedCopper;

export const getSelectedCoppers = (state: CopperState) => state.selectedCoppers.slice();

export const getActionsSelectedCopper = (state: CopperState) => state.actionsSelectedCopper;

export const getEntityById = (id: string) => (state: CopperState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}