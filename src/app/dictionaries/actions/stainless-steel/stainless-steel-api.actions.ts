import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[StainlessSteels/API] Add One StainlessSteel Success'
);

export const addOneFailure = createAction(
    '[StainlessSteels/API] Add One StainlessSteel Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[StainlessSteels/API] Remove One StainlessSteel Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[StainlessSteels/API] Remove One StainlessSteel Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[StainlessSteels/API] Update One StainlessSteel Success',
    props<{ stainlessSteel: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[StainlessSteels/API] Update One StainlessSteel Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[StainlessSteels/API] Load All StainlessSteels Success',
    props<{ stainlessSteels: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[StainlessSteels/API] Load All StainlessSteels Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[StainlessSteels/API] Load One StainlessSteel Success',
    props<{ stainlessSteels: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[StainlessSteels/API] Load One StainlessSteel Failure',
    props<{ error: string }>()
);