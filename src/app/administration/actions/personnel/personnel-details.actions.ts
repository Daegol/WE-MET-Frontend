import { createAction, props } from '@ngrx/store';
import { PersonnelSetNewPasswordViewModel, PersonnelViewModel, SetAllRolesViewModel, SetRolesViewModel } from '@we-met-app/api/models';

export const getOne = createAction(
    '[Personnel Details] Get one Personnel',
    props<{ id: string }>()
);

export const updateOne = createAction(
    '[Personnel Details] Update personnel',
    props<{ personnel: PersonnelViewModel }>()
);

export const removeOne = createAction(
    '[Personnel Details] Remove one Personnel',
    props<{ id: string }>()
);

export const updateOnePassword = createAction(
    '[Personnel Details] Update personnel password',
    props<{ password: PersonnelSetNewPasswordViewModel }>()
);

export const setRoles = createAction(
    '[Personnel Details] Set personnel roles',
    props<{ roles: SetRolesViewModel }>()
);

export const setAllRoles = createAction(
    '[Personnel Details] Set personnel all roles',
    props<{ roles: SetAllRolesViewModel }>()
)

export const removeOneGroup = createAction(
    '[Personnel Details Groups] Remove One Group',
    props<{ id: string }>()
);