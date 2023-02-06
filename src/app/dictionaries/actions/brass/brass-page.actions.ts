import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[Brasss Page] Get Brasss List'
);

export const getAllFromBrasssDetails = createAction(
    '[Brasss Details Page] Get Brasss List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get Brasss List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get Brasss List'
);

export const removeOne = createAction(
    '[Brasss Page] Remove one Brass',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[Brasss Page] Remove many Brasss',
    props<{ brasss: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[Brasss Page] Delete Operation',
    props<{ brasss: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[Brasss Page] Delete Confirmation',
    props<{ brasss: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Brasss Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[Brasss Page] Create new Brass',
    props<{ brass: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[Brasss Page] Open new Brass popup'
);

export const closeNewDialog = createAction(
    '[Brasss Page] Close new Brass popup'
);

export const openEditDialog = createAction(
    '[Brasss Page] Open Edit Brass popup',
    props<{ brass: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[Brasss Page] Close Edit Brass popup'
);
export const openDeleteDialog = createAction(
    '[Brasss Page] Open Delete Brass popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[Brasss Page] Close Delete Brass popup'
);

export const setSelectedBrass = createAction(
    '[Brasss Page] Set Selected Row',
    props<{ brass: SubCategoryDto }>()
);
export const setSelectedBrasss = createAction(
    '[Brasss Page] Set Selected Brasss',
    props<{ brasss: SubCategoryDto[] }>()
);

export const setActionsSelectedBrass = createAction(
    '[Brasss Page] Set Actions Selected Brass',
    props<{ brass: SubCategoryDto }>()
);

export const getSelectedBrass = createAction(
    '[Brasss Page] Get Selected Row'
);


export const getOne = createAction(
    '[Brasss Page] Get one Brass',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[Brasss Page] Update Brass',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[Brasss Page] Remove one selected Brass',
    props<{ id: number }>()
);
