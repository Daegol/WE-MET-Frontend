import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[ZincAndLeads Page] Get ZincAndLeads List'
);

export const getAllFromZincAndLeadsDetails = createAction(
    '[ZincAndLeads Details Page] Get ZincAndLeads List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get ZincAndLeads List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get ZincAndLeads List'
);

export const removeOne = createAction(
    '[ZincAndLeads Page] Remove one ZincAndLead',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[ZincAndLeads Page] Remove many ZincAndLeads',
    props<{ zincAndLeads: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[ZincAndLeads Page] Delete Operation',
    props<{ zincAndLeads: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[ZincAndLeads Page] Delete Confirmation',
    props<{ zincAndLeads: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[ZincAndLeads Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[ZincAndLeads Page] Create new ZincAndLead',
    props<{ zincAndLead: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[ZincAndLeads Page] Open new ZincAndLead popup'
);

export const closeNewDialog = createAction(
    '[ZincAndLeads Page] Close new ZincAndLead popup'
);

export const openEditDialog = createAction(
    '[ZincAndLeads Page] Open Edit ZincAndLead popup',
    props<{ zincAndLead: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[ZincAndLeads Page] Close Edit ZincAndLead popup'
);
export const openDeleteDialog = createAction(
    '[ZincAndLeads Page] Open Delete ZincAndLead popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[ZincAndLeads Page] Close Delete ZincAndLead popup'
);

export const setSelectedZincAndLead = createAction(
    '[ZincAndLeads Page] Set Selected Row',
    props<{ zincAndLead: SubCategoryDto }>()
);
export const setSelectedZincAndLeads = createAction(
    '[ZincAndLeads Page] Set Selected ZincAndLeads',
    props<{ zincAndLeads: SubCategoryDto[] }>()
);

export const setActionsSelectedZincAndLead = createAction(
    '[ZincAndLeads Page] Set Actions Selected ZincAndLead',
    props<{ zincAndLead: SubCategoryDto }>()
);

export const getSelectedZincAndLead = createAction(
    '[ZincAndLeads Page] Get Selected Row'
);


export const getOne = createAction(
    '[ZincAndLeads Page] Get one ZincAndLead',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[ZincAndLeads Page] Update ZincAndLead',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[ZincAndLeads Page] Remove one selected ZincAndLead',
    props<{ id: number }>()
);
