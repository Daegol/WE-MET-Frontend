import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[Aluminums Page] Get Aluminums List'
);

export const getAllFromAluminumsDetails = createAction(
    '[Aluminums Details Page] Get Aluminums List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get Aluminums List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get Aluminums List'
);

export const removeOne = createAction(
    '[Aluminums Page] Remove one Aluminum',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[Aluminums Page] Remove many Aluminums',
    props<{ aluminums: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[Aluminums Page] Delete Operation',
    props<{ aluminums: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[Aluminums Page] Delete Confirmation',
    props<{ aluminums: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Aluminums Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[Aluminums Page] Create new Aluminum',
    props<{ aluminum: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[Aluminums Page] Open new Aluminum popup'
);

export const closeNewDialog = createAction(
    '[Aluminums Page] Close new Aluminum popup'
);

export const openEditDialog = createAction(
    '[Aluminums Page] Open Edit Aluminum popup',
    props<{ aluminum: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[Aluminums Page] Close Edit Aluminum popup'
);
export const openDeleteDialog = createAction(
    '[Aluminums Page] Open Delete Aluminum popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[Aluminums Page] Close Delete Aluminum popup'
);

export const setSelectedAluminum = createAction(
    '[Aluminums Page] Set Selected Row',
    props<{ aluminum: SubCategoryDto }>()
);
export const setSelectedAluminums = createAction(
    '[Aluminums Page] Set Selected Aluminums',
    props<{ aluminums: SubCategoryDto[] }>()
);

export const setActionsSelectedAluminum = createAction(
    '[Aluminums Page] Set Actions Selected Aluminum',
    props<{ aluminum: SubCategoryDto }>()
);

export const getSelectedAluminum = createAction(
    '[Aluminums Page] Get Selected Row'
);


export const getOne = createAction(
    '[Aluminums Page] Get one Aluminum',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[Aluminums Page] Update Aluminum',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[Aluminums Page] Remove one selected Aluminum',
    props<{ id: number }>()
);
