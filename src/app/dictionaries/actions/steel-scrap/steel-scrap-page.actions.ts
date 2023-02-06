import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getAll = createAction(
    '[SteelScraps Page] Get SteelScraps List'
);

export const getAllFromSteelScrapsDetails = createAction(
    '[SteelScraps Details Page] Get SteelScraps List'
);

export const getAllFromSquadronsDetails = createAction(
    '[Squadrons Details Page] Get SteelScraps List'
);
export const getAllFromSquadronsPage = createAction(
    '[Squadrons Page] Get SteelScraps List'
);

export const removeOne = createAction(
    '[SteelScraps Page] Remove one SteelScrap',
    props<{ id: number }>()
);

export const removeMany = createAction(
    '[SteelScraps Page] Remove many SteelScraps',
    props<{ steelScraps: SubCategoryDto[] }>()
);

export const deleteOperation = createAction(
    '[SteelScraps Page] Delete Operation',
    props<{ steelScraps: SubCategoryDto[] }>()
);

export const deleteConfirmation = createAction(
    '[SteelScraps Page] Delete Confirmation',
    props<{ steelScraps: SubCategoryDto[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[SteelScraps Page] Delete Confirmation Dismiss'
);

export const createNew = createAction(
    '[SteelScraps Page] Create new SteelScrap',
    props<{ steelScrap: SubCategoryDto }>()
);

export const openNewDialog = createAction(
    '[SteelScraps Page] Open new SteelScrap popup'
);

export const closeNewDialog = createAction(
    '[SteelScraps Page] Close new SteelScrap popup'
);

export const openEditDialog = createAction(
    '[SteelScraps Page] Open Edit SteelScrap popup',
    props<{ steelScrap: SubCategoryDto }>()
);

export const closeEditDialog = createAction(
    '[SteelScraps Page] Close Edit SteelScrap popup'
);
export const openDeleteDialog = createAction(
    '[SteelScraps Page] Open Delete SteelScrap popup',
    props<{ isMenuAction: boolean }>()
);
export const closeDeleteDialog = createAction(
    '[SteelScraps Page] Close Delete SteelScrap popup'
);

export const setSelectedSteelScrap = createAction(
    '[SteelScraps Page] Set Selected Row',
    props<{ steelScrap: SubCategoryDto }>()
);
export const setSelectedSteelScraps = createAction(
    '[SteelScraps Page] Set Selected SteelScraps',
    props<{ steelScraps: SubCategoryDto[] }>()
);

export const setActionsSelectedSteelScrap = createAction(
    '[SteelScraps Page] Set Actions Selected SteelScrap',
    props<{ steelScrap: SubCategoryDto }>()
);

export const getSelectedSteelScrap = createAction(
    '[SteelScraps Page] Get Selected Row'
);


export const getOne = createAction(
    '[SteelScraps Page] Get one SteelScrap',
    props<{ id: number }>()
);
export const updateOne = createAction(
    '[SteelScraps Page] Update SteelScrap',
    props<{ flightType: SubCategoryDto }>()
);

export const removeOneFromSelected = createAction(
    '[SteelScraps Page] Remove one selected SteelScrap',
    props<{ id: number }>()
);
