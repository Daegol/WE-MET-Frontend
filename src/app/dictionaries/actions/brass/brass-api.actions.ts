import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[Brasss/API] Add One Brass Success'
);

export const addOneFailure = createAction(
    '[Brasss/API] Add One Brass Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Brasss/API] Remove One Brass Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[Brasss/API] Remove One Brass Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Brasss/API] Update One Brass Success',
    props<{ brass: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[Brasss/API] Update One Brass Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Brasss/API] Load All Brasss Success',
    props<{ brasss: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[Brasss/API] Load All Brasss Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Brasss/API] Load One Brass Success',
    props<{ brasss: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[Brasss/API] Load One Brass Failure',
    props<{ error: string }>()
);