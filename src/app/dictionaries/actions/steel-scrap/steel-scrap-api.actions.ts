import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[SteelScraps/API] Add One SteelScrap Success'
);

export const addOneFailure = createAction(
    '[SteelScraps/API] Add One SteelScrap Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[SteelScraps/API] Remove One SteelScrap Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[SteelScraps/API] Remove One SteelScrap Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[SteelScraps/API] Update One SteelScrap Success',
    props<{ steelScrap: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[SteelScraps/API] Update One SteelScrap Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[SteelScraps/API] Load All SteelScraps Success',
    props<{ steelScraps: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[SteelScraps/API] Load All SteelScraps Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[SteelScraps/API] Load One SteelScrap Success',
    props<{ steelScraps: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[SteelScraps/API] Load One SteelScrap Failure',
    props<{ error: string }>()
);