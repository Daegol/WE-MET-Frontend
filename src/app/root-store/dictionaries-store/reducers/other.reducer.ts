import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { OtherApiActions, OtherPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface OtherState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedOther: SubCategoryDto,
    selectedOtherId: string;
    selectedOthers: SubCategoryDto[],
    actionsSelectedOther: SubCategoryDto,
}

const initialState: OtherState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedOther: null,
    selectedOthers: [],
    selectedOtherId: null,
    actionsSelectedOther: null,
});

export const otherReducer = createReducer(
    initialState,

    on(OtherPageActions.setSelectedOthers, (state, { others }) => ({
        ...state,
        selectedOthers: others as SubCategoryDto[]
    })),

    on(OtherPageActions.setSelectedOther, (state, { other }) => ({
        ...state,
        selectedPersonnel: other
    })),
    on(OtherPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(OtherApiActions.loadAllSuccess, (state, { others }) => {
        return adapter.setAll(others, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(others.map((other) => other.name))]
        })
    }),
    on(OtherApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(OtherApiActions.loadOneSuccess, (state, { others }) => {
        return adapter.addOne(others, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(OtherApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(OtherApiActions.addOneSuccess, (state) => ({
        ...state,
        newOtherPopupOpened: false,
        selectedOthers: []
    })),
    on(OtherApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(OtherApiActions.updateOneSuccess, (state, { other }) => {
        return adapter.upsertOne(other, state);
    }),
    on(OtherApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(OtherApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedOthers: []
        });
    }),
    on(OtherApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(OtherPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedOthers: state.selectedOthers.filter((others) => others.id !== id)
    })),
    on(OtherPageActions.setActionsSelectedOther, (state, { other }) => ({
        ...state,
        actionsSelectedOther: other
    })),
);

export const getLoaded = (state: OtherState) => state.loaded;

export const getLoading = (state: OtherState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectOthersNames = (state: OtherState) => state.names.slice().sort();

export const getSelectedRow = (state: OtherState) => state.selectedOther;

export const getSelectedOthers = (state: OtherState) => state.selectedOthers.slice();

export const getActionsSelectedOther = (state: OtherState) => state.actionsSelectedOther;

export const getEntityById = (id: string) => (state: OtherState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}