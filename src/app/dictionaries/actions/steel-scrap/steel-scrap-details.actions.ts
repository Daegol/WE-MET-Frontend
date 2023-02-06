import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[SteelScraps Details] Get One SteelScrap',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[SteelScraps Details] Update One SteelScrap',
    props<{ steelScrap: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[SteelScraps Details] Remove One SteelScrap',
    props<{ id: number }>()
);