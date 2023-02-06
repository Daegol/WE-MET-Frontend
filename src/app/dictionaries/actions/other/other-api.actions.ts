import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[Others/API] Add One Other Success'
);

export const addOneFailure = createAction(
    '[Others/API] Add One Other Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Others/API] Remove One Other Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[Others/API] Remove One Other Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Others/API] Update One Other Success',
    props<{ other: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[Others/API] Update One Other Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Others/API] Load All Others Success',
    props<{ others: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[Others/API] Load All Others Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Others/API] Load One Other Success',
    props<{ others: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[Others/API] Load One Other Failure',
    props<{ error: string }>()
);