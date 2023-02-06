import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { ZincAndLeadApiActions, ZincAndLeadPageActions } from '@we-met-app/dictionaries/actions';

export const adapter: EntityAdapter<SubCategoryDto> = createEntityAdapter<SubCategoryDto>({ sortComparer: sortByName });

export interface ZincAndLeadState extends EntityState<SubCategoryDto> {
    loaded: boolean;
    loading: boolean;
    error: string | null;
    names: string[],
    selectedZincAndLead: SubCategoryDto,
    selectedZincAndLeadId: string;
    selectedZincAndLeads: SubCategoryDto[],
    actionsSelectedZincAndLead: SubCategoryDto,
}

const initialState: ZincAndLeadState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    names: [],
    selectedZincAndLead: null,
    selectedZincAndLeads: [],
    selectedZincAndLeadId: null,
    actionsSelectedZincAndLead: null,
});

export const zincAndLeadReducer = createReducer(
    initialState,

    on(ZincAndLeadPageActions.setSelectedZincAndLeads, (state, { zincAndLeads }) => ({
        ...state,
        selectedZincAndLeads: zincAndLeads as SubCategoryDto[]
    })),

    on(ZincAndLeadPageActions.setSelectedZincAndLead, (state, { zincAndLead }) => ({
        ...state,
        selectedPersonnel: zincAndLead
    })),
    on(ZincAndLeadPageActions.getAll, (state) => ({
        ...state,
        loading: true,
    })),
    on(ZincAndLeadApiActions.loadAllSuccess, (state, { zincAndLeads }) => {
        return adapter.setAll(zincAndLeads, {
            ...state,
            loaded: true,
            loading: false,
            names: [...new Set(zincAndLeads.map((zincAndLead) => zincAndLead.name))]
        })
    }),
    on(ZincAndLeadApiActions.loadAllFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(ZincAndLeadApiActions.loadOneSuccess, (state, { zincAndLeads }) => {
        return adapter.addOne(zincAndLeads, {
            ...state,
            loaded: true,
            loading: false
        })
    }),
    on(ZincAndLeadApiActions.loadOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(ZincAndLeadApiActions.addOneSuccess, (state) => ({
        ...state,
        newZincAndLeadPopupOpened: false,
        selectedZincAndLeads: []
    })),
    on(ZincAndLeadApiActions.addOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(ZincAndLeadApiActions.updateOneSuccess, (state, { zincAndLead }) => {
        return adapter.upsertOne(zincAndLead, state);
    }),
    on(ZincAndLeadApiActions.updateOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(ZincAndLeadApiActions.removeOneSuccess, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            selectedZincAndLeads: []
        });
    }),
    on(ZincAndLeadApiActions.removeOneFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(ZincAndLeadPageActions.removeOneFromSelected, (state, { id }) => ({
        ...state,
        selectedZincAndLeads: state.selectedZincAndLeads.filter((zincAndLeads) => zincAndLeads.id !== id)
    })),
    on(ZincAndLeadPageActions.setActionsSelectedZincAndLead, (state, { zincAndLead }) => ({
        ...state,
        actionsSelectedZincAndLead: zincAndLead
    })),
);

export const getLoaded = (state: ZincAndLeadState) => state.loaded;

export const getLoading = (state: ZincAndLeadState) => state.loading;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const selectZincAndLeadsNames = (state: ZincAndLeadState) => state.names.slice().sort();

export const getSelectedRow = (state: ZincAndLeadState) => state.selectedZincAndLead;

export const getSelectedZincAndLeads = (state: ZincAndLeadState) => state.selectedZincAndLeads.slice();

export const getActionsSelectedZincAndLead = (state: ZincAndLeadState) => state.actionsSelectedZincAndLead;

export const getEntityById = (id: string) => (state: ZincAndLeadState) => state.entities[id];

export function sortByName(a: SubCategoryDto, b: SubCategoryDto): number {
    return a.name.localeCompare(b.name);
}