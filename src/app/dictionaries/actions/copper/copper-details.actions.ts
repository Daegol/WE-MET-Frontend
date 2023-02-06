import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[Coppers Details] Get One Copper',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[Coppers Details] Update One Copper',
    props<{ copper: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[Coppers Details] Remove One Copper',
    props<{ id: number }>()
);