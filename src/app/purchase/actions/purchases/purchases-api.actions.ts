import { createAction, props } from '@ngrx/store';

import { PurchaseDto } from '@we-met-app/api/models';

export const addOneSuccess = createAction(
    '[Purchases/API] Add One Purchase Success'
);

export const addOneFailure = createAction(
    '[Purchases/API] Add One Purchase Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Purchases/API] Remove One Purchase Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[Purchases/API] Remove One Purchase Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Purchases/API] Update One Purchase Success',
    props<{ purchase: PurchaseDto }>()
);

export const updateOneFailure = createAction(
    '[Purchases/API] Update One Purchase Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Purchases/API] Load All Purchases Success',
    props<{ purchases: PurchaseDto[] }>()
);

export const loadAllFailure = createAction(
    '[Purchases/API] Load All Purchases Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Purchases/API] Load One Purchase Success',
    props<{ purchases: PurchaseDto }>()
);

export const loadOneFailure = createAction(
    '[Purchases/API] Load One Purchase Failure',
    props<{ error: string }>()
);