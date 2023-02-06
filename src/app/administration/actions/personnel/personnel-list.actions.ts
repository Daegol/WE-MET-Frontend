import { createAction, props } from '@ngrx/store';
import { GroupViewModel, PersonnelViewModel, SetMainAdminViewModel } from '@we-met-app/api/models';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';
import { RegisterUserViewModel } from '@we-met-app/api/models/register-user-view-model';

export const getAll = createAction(
    '[Personnel List] Get Personnel List'
);

export const getPersonnelAvailability = createAction(
    '[Personnel List] Get Personnel Availability',
    props<{ squadronId: string, from: string, to: string }>()
)

export const getAllByFcifId = createAction(
    '[Personnel List] Get Personnel By Fcif Id List',
    props<{ fcifId: string }>()
);

export const getAllFromMyPage = createAction(
    '[My Page] Get Personnel List'
);

export const getAllFromNewPTL = createAction(
    '[New PTL] Get Personnel List'
);

export const getAllFromCommitmentBoard = createAction(
    '[Commitment Board] Get Personnel List'
);

export const getAllFromPersonnelDetails = createAction(
    '[Personnel Details] Get Personnel List'
);

export const getAllFromTraining = createAction(
    '[Training User Page] Get Personnel List'
);

export const getAllGroupsPersonnel = createAction(
    '[Personnel List Details Groups] Get Groups Personnel List'
)

export const addGroup = createAction(
    '[Personnel List Details Groups] Add Group',
    props<{ groupPersonnel: GroupPersonnelViewModel }>()
);

export const openAddGroupDialog = createAction(
    '[Personnel List Details Groups] Open Add Group Popup'
);

export const closeAddGroupDialog = createAction(
    '[Personnel List Details Groups] Close Add Group Dialog Popup'
);

export const removeOneGroup = createAction(
    '[Personnel List Details Groups] Remove One Group',
    props<{ id: string }>()
);

export const removeOneGroupFromSelected = createAction(
    '[Personnel List Details Groups] Remove One Selected Group',
    props<{ id: string }>()
);

export const removeManyGroup = createAction(
    '[Personnel List Details Groups] Remove Many Groups',
    props<{ groupsPersonnel: GroupPersonnelViewModel[] }>()
);

export const getOneFromMyPage = createAction(
    '[My Page] Get One Personnel',
    props<{ id: string }>()
);

export const removeOne = createAction(
    '[Personnel List] Remove one Personnel',
    props<{ id: string }>()
);

export const removeMany = createAction(
    '[Personnel List] Remove many Personnel',
    props<{ personnels: PersonnelViewModel[] }>()
);

export const setInitialSquadrons = createAction(
    '[Personnel List Init] Set Initial Squadrons',
    props<{ ids: string[] }>()
);

export const setCurrentSquadrons = createAction(
    '[Personnel List Current] Set Current Squadrons',
    props<{ ids: string[] }>()
);

export const setInitialPersonnelId = createAction(
    '[Personnel List Details Groups Init] Set Initial Personnel ID',
    props<{ id: string }>()
);

export const setCurrentPersonnelId = createAction(
    '[Personnel List Details Groups Current] Set Current Personnel ID',
    props<{ id: string }>()
);

export const createNew = createAction(
    '[Personnel List] Create new Personnel',
    props<{ personnel: RegisterUserViewModel }>()
);

export const openNewDialog = createAction(
    '[Personnel List] Open new Personnel popup'
);

export const closeNewDialog = createAction(
    '[Personnel List] Close new Personnel popup'
);

export const setSelectedPersonnel = createAction(
    '[Personnel List] Set selected personnel',
    props<{ personnel: PersonnelViewModel }>()
);

export const setSelectedPersonnels = createAction(
    '[Personnel List] Set selected personnels',
    props<{ personnels: PersonnelViewModel[] }>()
);

export const setActionsSelectedPersonnel = createAction(
    '[Personnel List] Set Actions Selected Personnel',
    props<{ personnel: PersonnelViewModel }>()
);

export const removeOneFromSelected = createAction(
    '[Personnel List] Remove one selected Personnel',
    props<{ id: string }>()
);

export const openSetPasswordDialog = createAction(
    '[Personnel List] Open Set Personnel Password popup'
);

export const closeSetPasswordDialog = createAction(
    '[Personnel List] Close Set Personnel Password popup'
);

export const addToFcifPersonnelList = createAction(
    '[Personnel List] Add to FCIF Personnel List',
    props<{ personnel: PersonnelViewModel }>()
)

export const removeOneFromFcifPersonnelList = createAction(
    '[Personnel List] Remove one from FCIF Personnel List',
    props<{ personnel: PersonnelViewModel }>()
)

export const removeAllFromFcifPersonnelList = createAction(
    '[Personnel List] Remove all from FCIF Personnel List',
)

export const getAllRoles = createAction(
    '[Personnel List] Get all Roles',
)

export const closeDeleteDialog = createAction(
    '[Personnel List] Close Delete Personnel popup'
);

export const deleteOperation = createAction(
    '[Personnel List] Delete Operation',
    props<{ personnel: PersonnelViewModel[] }>()
);

export const deleteConfirmation = createAction(
    '[Personnel List] Delete Confirmation',
    props<{ personnel: PersonnelViewModel[] }>()
);

export const deleteConfirmationDismiss = createAction(
    '[Personnel List] Delete Confirmation Dismiss'
);

export const deleteGroupOperation = createAction(
    '[Personnel List Details Groups] Delete Group Operation',
    props<{ groupsPersonnel: GroupPersonnelViewModel[] }>()
);

export const deleteGroupConfirmation = createAction(
    '[Personnel List Details Groups] Delete Group Confirmation',
    props<{ groupsPersonnel: GroupPersonnelViewModel[] }>()
);

export const deleteGroupConfirmationDismiss = createAction(
    '[Personnel List Details Groups] Delete Group Confirmation Dismiss'
);

export const setMainAdminRole = createAction(
    '[Personnel List] Set Main Admin Role',
    props<{ mainAdmin: SetMainAdminViewModel }>()
);

export const setSelectedGroups = createAction(
    '[Personnel List] Set Selected Groups',
    props<{ groups: GroupViewModel[] }>()
);