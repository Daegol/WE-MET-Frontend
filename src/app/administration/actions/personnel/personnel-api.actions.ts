import { createAction, props } from '@ngrx/store';

import { PersonnelFlightAvailabilityViewModel, PersonnelSetNewPasswordViewModel, PersonnelViewModel, RoleViewModel, SetAllRolesViewModel, SetMainAdminViewModel, UserRolesForSquadronViewModel } from '@we-met-app/api/models';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';

export const addOneSuccess = createAction(
    '[Personnel/API] Add personnel Success'
);

export const addOneFailure = createAction(
    '[Personnel/API] Add personnel Failure',
    props<{ error: string }>()
);

export const removeOneSuccess = createAction(
    '[Personnel/API] Remove personnel Success',
    props<{ id: string }>()
);

export const removeOneFailure = createAction(
    '[Personnel/API] Remove personnel Failure',
    props<{ error: string }>()
);

export const updateOneSuccess = createAction(
    '[Personnel/API] Update personnel Success',
    props<{ personnel: PersonnelViewModel }>()
);

export const updateOneFailure = createAction(
    '[Personnel/API] Update personnel Failure',
    props<{ error: string }>()
);

export const loadAllSuccess = createAction(
    '[Personnel/API] Load all Success',
    props<{ personnel: PersonnelViewModel[] }>()
);

export const loadAllFailure = createAction(
    '[Personnel/API] Load personnel Failure',
    props<{ error: string }>()
);

export const loadAllGroupsPersonnelSuccess = createAction(
    '[Personnel/API] Load all Groups Personnel Success',
    props<{ groupsPersonnel: GroupPersonnelViewModel[] }>()
);

export const loadAllGroupsPersonnelFailure = createAction(
    '[Personnel/API] Load all Groups Personnel Failure',
    props<{ error: string }>()
);

export const addOneGroupSuccess = createAction(
    '[Personnel/API] Add One Group Success'
);

export const addOneGroupFailure = createAction(
    '[Personnel/API] Add One Group Failure',
    props<{ error: string }>()
);

export const removeOneGroupSuccess = createAction(
    '[Personnel/API] Remove One Group Success',
    props<{ id: string }>()
);

export const removeOneGroupFailure = createAction(
    '[Personnel/API] Remove One Group Failure',
    props<{ error: string }>()
);

export const loadAllByFcifIdSuccess = createAction(
    '[Personnel/API] Load personnel by FCIF Id Success',
    props<{ personnel: PersonnelViewModel[] }>()
);

export const loadAllByFcifIdFailure = createAction(
    '[Personnel/API] Load personnel by FCIF Id Failure',
    props<{ error: string }>()
);

export const loadOneSuccess = createAction(
    '[Personnel/API] Load one Success',
    props<{ personnel: PersonnelViewModel }>()
);

export const loadOneFailure = createAction(
    '[Personnel/API] Load one Failure',
    props<{ error: string }>()
);

export const updateOnePasswordSuccess = createAction(
    '[Personnel/API] Update personnel password Success',
    props<{ password: PersonnelSetNewPasswordViewModel }>()
);

export const updateOnePasswordFailure = createAction(
    '[Personnel/API] Update personnel password Failure',
    props<{ error: string }>()
);

export const setRolesSuccess = createAction(
    '[Personnel/API] Set personnel roles Success',
    props<{ roles: UserRolesForSquadronViewModel }>()
);

export const setRolesFailure = createAction(
    '[Personnel/API] Set personnel roles Failure',
    props<{ error: string }>()
);

export const setAllRolesSuccess = createAction(
    '[Personnel/API] Set personnel all roles Success',
    props<{ roles: SetAllRolesViewModel }>()
);

export const setAllRolesFailure = createAction(
    '[Personnel/API] Set personnel all roles Failure',
    props<{ error: string }>()
);

export const loadAllRolesSuccess = createAction(
    '[Personnel/API] Load all roles Success',
    props<{ roles: RoleViewModel[] }>()
);

export const loadAllRolesFailure = createAction(
    '[Personnel/API] Load all roles Failure',
    props<{ error: string }>()
);

export const loadPersonnelAvailabilitySuccess = createAction(
    '[Personnel/API] Load Personnel Availability Success',
    props<{ personnelAvailability: PersonnelFlightAvailabilityViewModel[] }>()
);

export const loadPersonnelAvailabilityFailure = createAction(
    '[Personnel/API] Load Personnel Availability Failure',
    props<{ error: string }>()
);

export const setMainAdminRoleSuccess = createAction(
    '[Personnel/API] Set Main Admin Role Success',
    props<{ mainAdmin: SetMainAdminViewModel }>()
);

export const setMainAdminRoleFailure = createAction(
    '[Personnel/API] Set Main Admin Role Failure',
    props<{ error: string }>()
);
