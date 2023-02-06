import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[Others Details] Get One Other',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[Others Details] Update One Other',
    props<{ other: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[Others Details] Remove One Other',
    props<{ id: number }>()
);