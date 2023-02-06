import { createAction, props } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';

export const getOne = createAction(
    '[ZincAndLeads Details] Get One ZincAndLead',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[ZincAndLeads Details] Update One ZincAndLead',
    props<{ zincAndLead: SubCategoryDto }>()
);

export const removeOne = createAction(
    '[ZincAndLeads Details] Remove One ZincAndLead',
    props<{ id: number }>()
);