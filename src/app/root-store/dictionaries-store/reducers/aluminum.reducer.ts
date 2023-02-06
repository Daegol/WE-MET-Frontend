import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { AluminumApiActions, AluminumPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface AluminumState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedAluminum: SubCategoryDto,
    selectedAluminumId: string;
    selectedAluminums: SubCategoryDto[],
    actionsSelectedAluminum: SubCategoryDto,
}

const initialState: AluminumState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedAluminum: null,
    selectedAluminums: [],
    selectedAluminumId: null,
    actionsSelectedAluminum: null,
});

export const aluminumReducer = createReducer(
    initialState,

    on(AluminumPageActions.setSelectedAluminums, (state, { aluminums }) => ({
        ...state,
        selectedAluminums: aluminums as SubCategoryDto[]
    })),

    on(AluminumPageActions.setSelectedAluminum, (state, { aluminum }) => ({
        ...state,
        selectedPersonnel: aluminum
    })),
    on(AluminumPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(AluminumApiActions.loadAllSuccess, (state, { aluminums }) => {
        return adapter.setAll(aluminums, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(aluminums.map((aluminum) => aluminum.name))]
        })
    }),
    on(AluminumApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(AluminumApiActions.loadOneSuccess, (state, { aluminums }) => {
        return adapter.addOne(aluminums, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(AluminumApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(AluminumApiActions.addOneSuccess, (state) => ({
        ...state,
        newAluminumPopupOpened: false,
        selectedAluminums: []
    })),
    on(AluminumApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(AluminumApiActions.updateOneSuccess, (state, { aluminum }) => {
        return adapter.upsertOne(aluminum, state);
    }),
    on(AluminumApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(AluminumApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedAluminums: []
        });
    }),
    on(AluminumApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(AluminumPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedAluminums: state.selectedAluminums.filter((aluminums) => aluminums.id !== id)
    })),
    on(AluminumPageActions.setActionsSelectedAluminum, (state, { aluminum }) => ({
        ...state,
        actionsSelectedAluminum: aluminum
    })),
);

export const getLoaded = (state: AluminumState) => state.loaded;

export const getLoading = (state: AluminumState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectAluminumsNames = (state: AluminumState) => state.names.slice().sort();

export const getSelectedRow = (state: AluminumState) => state.selectedAluminum;

export const getSelectedAluminums = (state: AluminumState) => state.selectedAluminums.slice();

export const getActionsSelectedAluminum = (state: AluminumState) => state.actionsSelectedAluminum;

export const getEntityById = (id: string) => (state: AluminumState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}