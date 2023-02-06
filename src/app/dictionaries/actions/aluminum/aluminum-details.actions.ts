import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[Aluminums Details] Get One Aluminum',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[Aluminums Details] Update One Aluminum',
    props<{ aluminum: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[Aluminums Details] Remove One Aluminum',
    props<{ id: number }>()
);