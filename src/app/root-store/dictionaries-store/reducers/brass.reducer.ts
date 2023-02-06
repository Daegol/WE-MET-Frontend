import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { BrassApiActions, BrassPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface BrassState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedBrass: SubCategoryDto,
    selectedBrassId: string;
    selectedBrasss: SubCategoryDto[],
    actionsSelectedBrass: SubCategoryDto,
}

const initialState: BrassState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedBrass: null,
    selectedBrasss: [],
    selectedBrassId: null,
    actionsSelectedBrass: null,
});

export const brassReducer = createReducer(
    initialState,

    on(BrassPageActions.setSelectedBrasss, (state, { brasss }) => ({
        ...state,
        selectedBrasss: brasss as SubCategoryDto[]
    })),

    on(BrassPageActions.setSelectedBrass, (state, { brass }) => ({
        ...state,
        selectedPersonnel: brass
    })),
    on(BrassPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(BrassApiActions.loadAllSuccess, (state, { brasss }) => {
        return adapter.setAll(brasss, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(brasss.map((brass) => brass.name))]
        })
    }),
    on(BrassApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(BrassApiActions.loadOneSuccess, (state, { brasss }) => {
        return adapter.addOne(brasss, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(BrassApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(BrassApiActions.addOneSuccess, (state) => ({
        ...state,
        newBrassPopupOpened: false,
        selectedBrasss: []
    })),
    on(BrassApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(BrassApiActions.updateOneSuccess, (state, { brass }) => {
        return adapter.upsertOne(brass, state);
    }),
    on(BrassApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(BrassApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedBrasss: []
        });
    }),
    on(BrassApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(BrassPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedBrasss: state.selectedBrasss.filter((brasss) => brasss.id !== id)
    })),
    on(BrassPageActions.setActionsSelectedBrass, (state, { brass }) => ({
        ...state,
        actionsSelectedBrass: brass
    })),
);

export const getLoaded = (state: BrassState) => state.loaded;

export const getLoading = (state: BrassState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectBrasssNames = (state: BrassState) => state.names.slice().sort();

export const getSelectedRow = (state: BrassState) => state.selectedBrass;

export const getSelectedBrasss = (state: BrassState) => state.selectedBrasss.slice();

export const getActionsSelectedBrass = (state: BrassState) => state.actionsSelectedBrass;

export const getEntityById = (id: string) => (state: BrassState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}