import { createAction, props } from '@ngrx/store';

import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const addOneSuccess = createAction(
    '[ZincAndLeads/API] Add One ZincAndLead Success'
);

export const addOneFailure = createAction(
    '[ZincAndLeads/API] Add One ZincAndLead Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[ZincAndLeads/API] Remove One ZincAndLead Success',
    props<{ id: number }>()
);

export const removeOneFailure = createAction(
    '[ZincAndLeads/API] Remove One ZincAndLead Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[ZincAndLeads/API] Update One ZincAndLead Success',
    props<{ zincAndLead: SubCategoryDto }>()
);

export const updateOneFailure = createAction(
    '[ZincAndLeads/API] Update One ZincAndLead Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[ZincAndLeads/API] Load All ZincAndLeads Success',
    props<{ zincAndLeads: SubCategoryDto[] }>()
);

export const loadAllFailure = createAction(
    '[ZincAndLeads/API] Load All ZincAndLeads Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[ZincAndLeads/API] Load One ZincAndLead Success',
    props<{ zincAndLeads: SubCategoryDto }>()
);

export const loadOneFailure = createAction(
    '[ZincAndLeads/API] Load One ZincAndLead Failure',
    props<{ error: string }>()
);