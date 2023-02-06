import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[StainlessSteels Details] Get One StainlessSteel',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[StainlessSteels Details] Update One StainlessSteel',
    props<{ stainlessSteel: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[StainlessSteels Details] Remove One StainlessSteel',
    props<{ id: number }>()
);