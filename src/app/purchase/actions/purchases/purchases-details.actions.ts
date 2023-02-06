import { createAction, props } from '@ngrx/store';
import { PurchaseDto } from '@we-met-app/api/models';

export const updateOne = createAction(
    '[Purchases Details] Update One Purchase',
    props<{ purchase: PurchaseDto }>()
);

export const removeOne = createAction(
    '[Purchases Details] Remove One Purchase',
    props<{ id: number }>()
);

export const getOne = createAction(
    '[Purchases Details] Get One Purchase',
    props<{ id: number }>()
);