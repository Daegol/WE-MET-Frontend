import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[StainlessSteels Page] Get StainlessSteels List'
);

export const getAllFromStainlessSteelsDetails = createAction(
    '[StainlessSteels Details Page] Get StainlessSteels List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get StainlessSteels List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get StainlessSteels List'
);

export const removeOne = createAction(
    '[StainlessSteels Page] Remove one StainlessSteel',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[StainlessSteels Page] Remove many StainlessSteels',
    props<{ stainlessSteels: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[StainlessSteels Page] Delete Operation',
    props<{ stainlessSteels: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[StainlessSteels Page] Delete Confirmation',
    props<{ stainlessSteels: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[StainlessSteels Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[StainlessSteels Page] Create new StainlessSteel',
    props<{ stainlessSteel: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[StainlessSteels Page] Open new StainlessSteel popup'
);

export const closeNewDialog = createAction(
    '[StainlessSteels Page] Close new StainlessSteel popup'
);

export const openEditDialog = createAction(
    '[StainlessSteels Page] Open Edit StainlessSteel popup',
    props<{ stainlessSteel: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[StainlessSteels Page] Close Edit StainlessSteel popup'
);
export const openDeleteDialog = createAction(
    '[StainlessSteels Page] Open Delete StainlessSteel popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[StainlessSteels Page] Close Delete StainlessSteel popup'
);

export const setSelectedStainlessSteel = createAction(
    '[StainlessSteels Page] Set Selected Row',
    props<{ stainlessSteel: SubCategoryDto }>()
);
export const setSelectedStainlessSteels = createAction(
    '[StainlessSteels Page] Set Selected StainlessSteels',
    props<{ stainlessSteels: SubCategoryDto[] }>()
);

export const setActionsSelectedStainlessSteel = createAction(
    '[StainlessSteels Page] Set Actions Selected StainlessSteel',
    props<{ stainlessSteel: SubCategoryDto }>()
);

export const getSelectedStainlessSteel = createAction(
    '[StainlessSteels Page] Get Selected Row'
);


export const getOne = createAction(
    '[StainlessSteels Page] Get one StainlessSteel',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[StainlessSteels Page] Update StainlessSteel',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[StainlessSteels Page] Remove one selected StainlessSteel',
    props<{ id: number }>()
);
