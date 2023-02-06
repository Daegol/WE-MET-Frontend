import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[Coppers Page] Get Coppers List'
);

export const getAllFromCoppersDetails = createAction(
    '[Coppers Details Page] Get Coppers List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get Coppers List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get Coppers List'
);

export const removeOne = createAction(
    '[Coppers Page] Remove one Copper',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[Coppers Page] Remove many Coppers',
    props<{ coppers: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[Coppers Page] Delete Operation',
    props<{ coppers: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[Coppers Page] Delete Confirmation',
    props<{ coppers: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Coppers Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[Coppers Page] Create new Copper',
    props<{ copper: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[Coppers Page] Open new Copper popup'
);

export const closeNewDialog = createAction(
    '[Coppers Page] Close new Copper popup'
);

export const openEditDialog = createAction(
    '[Coppers Page] Open Edit Copper popup',
    props<{ copper: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[Coppers Page] Close Edit Copper popup'
);
export const openDeleteDialog = createAction(
    '[Coppers Page] Open Delete Copper popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[Coppers Page] Close Delete Copper popup'
);

export const setSelectedCopper = createAction(
    '[Coppers Page] Set Selected Row',
    props<{ copper: SubCategoryDto }>()
);
export const setSelectedCoppers = createAction(
    '[Coppers Page] Set Selected Coppers',
    props<{ coppers: SubCategoryDto[] }>()
);

export const setActionsSelectedCopper = createAction(
    '[Coppers Page] Set Actions Selected Copper',
    props<{ copper: SubCategoryDto }>()
);

export const getSelectedCopper = createAction(
    '[Coppers Page] Get Selected Row'
);


export const getOne = createAction(
    '[Coppers Page] Get one Copper',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[Coppers Page] Update Copper',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[Coppers Page] Remove one selected Copper',
    props<{ id: number }>()
);
