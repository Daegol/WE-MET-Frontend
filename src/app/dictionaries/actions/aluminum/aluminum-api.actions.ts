import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[Aluminums/API] Add One Aluminum Success'
);

export const addOneFailure = createAction(
    '[Aluminums/API] Add One Aluminum Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Aluminums/API] Remove One Aluminum Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[Aluminums/API] Remove One Aluminum Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Aluminums/API] Update One Aluminum Success',
    props<{ aluminum: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[Aluminums/API] Update One Aluminum Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Aluminums/API] Load All Aluminums Success',
    props<{ aluminums: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[Aluminums/API] Load All Aluminums Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Aluminums/API] Load One Aluminum Success',
    props<{ aluminums: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[Aluminums/API] Load One Aluminum Failure',
    props<{ error: string }>()
);