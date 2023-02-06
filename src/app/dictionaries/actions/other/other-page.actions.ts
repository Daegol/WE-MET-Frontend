import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[Others Page] Get Others List'
);

export const getAllFromOthersDetails = createAction(
    '[Others Details Page] Get Others List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get Others List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get Others List'
);

export const removeOne = createAction(
    '[Others Page] Remove one Other',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[Others Page] Remove many Others',
    props<{ others: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[Others Page] Delete Operation',
    props<{ others: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[Others Page] Delete Confirmation',
    props<{ others: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Others Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[Others Page] Create new Other',
    props<{ other: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[Others Page] Open new Other popup'
);

export const closeNewDialog = createAction(
    '[Others Page] Close new Other popup'
);

export const openEditDialog = createAction(
    '[Others Page] Open Edit Other popup',
    props<{ other: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[Others Page] Close Edit Other popup'
);
export const openDeleteDialog = createAction(
    '[Others Page] Open Delete Other popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[Others Page] Close Delete Other popup'
);

export const setSelectedOther = createAction(
    '[Others Page] Set Selected Row',
    props<{ other: SubCategoryDto }>()
);
export const setSelectedOthers = createAction(
    '[Others Page] Set Selected Others',
    props<{ others: SubCategoryDto[] }>()
);

export const setActionsSelectedOther = createAction(
    '[Others Page] Set Actions Selected Other',
    props<{ other: SubCategoryDto }>()
);

export const getSelectedOther = createAction(
    '[Others Page] Get Selected Row'
);


export const getOne = createAction(
    '[Others Page] Get one Other',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[Others Page] Update Other',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[Others Page] Remove one selected Other',
    props<{ id: number }>()
);
