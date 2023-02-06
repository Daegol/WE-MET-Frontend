import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[Brasss Details] Get One Brass',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[Brasss Details] Update One Brass',
    props<{ brass: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[Brasss Details] Remove One Brass',
    props<{ id: number }>()
);