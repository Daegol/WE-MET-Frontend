import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[Coppers/API] Add One Copper Success'
);

export const addOneFailure = createAction(
    '[Coppers/API] Add One Copper Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Coppers/API] Remove One Copper Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[Coppers/API] Remove One Copper Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Coppers/API] Update One Copper Success',
    props<{ copper: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[Coppers/API] Update One Copper Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Coppers/API] Load All Coppers Success',
    props<{ coppers: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[Coppers/API] Load All Coppers Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Coppers/API] Load One Copper Success',
    props<{ coppers: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[Coppers/API] Load One Copper Failure',
    props<{ error: string }>()
);