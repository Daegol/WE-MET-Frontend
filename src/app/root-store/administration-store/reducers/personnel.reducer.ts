import { createReducer, on } from '@ngrx/store';
import { PersonnelFlightAvailabilityViewModel, PersonnelViewModel, RoleViewModel } from '@we-met-app/api/models';
import {
  PersonnelApiActions,
  PersonnelListActions
} from '@we-met-app/administration/actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';

export const adapter: EntityAdapter<PersonnelViewModel> = createEntityAdapter<PersonnelViewModel>({ sortComparer: sortByName });

export function sortByName(a: PersonnelViewModel, b: PersonnelViewModel): number {
  return a?.lastName?.localeCompare(b?.lastName);
}

export interface PersonnelState extends EntityState<PersonnelViewModel> {
  loaded: boolean;
  loading: boolean;
  error: string | null;
  selectedPersonnel: PersonnelViewModel,
  selectedPersonnels: PersonnelViewModel[],
  actionsSelectedPersonnel: PersonnelViewModel,
  newPersonnelPopupOpened: boolean,
  setPersonnelPasswordPopupOpened: boolean,
  personnelByFcifId: PersonnelViewModel[],
  fcifPersonnelList: PersonnelViewModel[],
  roles: RoleViewModel[],
  groupsPersonnel: GroupPersonnelViewModel[],
  personnelParams: PersonnelParams,
  selectedGroups: GroupPersonnelViewModel[],
  personnelAvailability: PersonnelFlightAvailabilityViewModel[],
}

const initialState: PersonnelState = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  selectedPersonnel: null,
  selectedPersonnels: [],
  actionsSelectedPersonnel: null,
  newPersonnelPopupOpened: false,
  setPersonnelPasswordPopupOpened: false,
  personnelByFcifId: [],
  fcifPersonnelList: [],
  roles: [],
  groupsPersonnel: [],
  personnelParams: {
    currentSquadronIds: [],
    currentPersonnelId: null
  },
  selectedGroups: [],
  personnelAvailability: []
});

export interface PersonnelParams {
  currentSquadronIds: string[];
  currentPersonnelId: string;
}

export const personnelReducer = createReducer(
  initialState,
  on(PersonnelListActions.setInitialSquadrons, (state, { ids }) => ({
    ...state,
    personnelParams: {
      ...state.personnelParams,
      currentSquadronIds: (state.personnelParams.currentSquadronIds === null || state.personnelParams.currentSquadronIds === []) ? ids : state.personnelParams.currentSquadronIds
    }
  })),
  on(PersonnelListActions.setCurrentSquadrons, (state, { ids }) => ({
    ...state,
    personnelParams: {
      ...state.personnelParams,
      currentSquadronIds: ids
    }
  })),
  on(PersonnelListActions.setInitialPersonnelId, (state, { id }) => ({
    ...state,
    personnelParams: {
      ...state.personnelParams,
      currentPersonnelId: (state.personnelParams.currentPersonnelId === null) ? id : state.personnelParams.currentPersonnelId
    }
  })),
  on(PersonnelListActions.setCurrentPersonnelId, (state, { id }) => ({
    ...state,
    personnelParams: {
      ...state.personnelParams,
      currentPersonnelId: id
    }
  })),
  on(PersonnelListActions.getAll, (state) => ({
    ...state,
    loading: true,
  })),
  on(PersonnelListActions.removeOne, (state) => ({
    ...state,
    loading: true,
  })),
  on(PersonnelApiActions.removeOneSuccess, (state) => ({
    ...state,
    selectedPersonnels: []
  })),
  on(PersonnelListActions.openNewDialog, (state) => ({
    ...state
  })),
  on(PersonnelListActions.openAddGroupDialog, (state) => ({
    ...state
  })),
  on(PersonnelListActions.closeNewDialog, (state) => ({
    ...state
  })),
  on(PersonnelListActions.createNew, (state, { }) => ({
    ...state
  })),
  on(PersonnelListActions.setSelectedPersonnel, (state, { personnel }) => ({
    ...state,
    selectedPersonnel: personnel
  })),
  on(PersonnelListActions.setSelectedPersonnels, (state, { personnels }) => ({
    ...state,
    selectedPersonnels: personnels as PersonnelViewModel[]
  })),
  on(PersonnelListActions.setActionsSelectedPersonnel, (state, { personnel }) => ({
    ...state,
    actionsSelectedPersonnel: personnel
  })),
  on(PersonnelListActions.removeOneFromSelected, (state, { id }) => ({
    ...state,
    selectedPersonnels: state.selectedPersonnels.filter((personnel) => personnel.id !== id)
  })),
  on(PersonnelApiActions.addOneSuccess, (state) => ({
    ...state,
    selectedPersonnels: []
  })),
  on(PersonnelApiActions.addOneFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(PersonnelApiActions.removeOneSuccess, (state, { id }) => {
    if (id == state.selectedPersonnel?.id) {
      return adapter.removeOne(id, { ...state, selectedPersonnel: null });
    }
    return adapter.removeOne(id, state);
  }),
  on(PersonnelApiActions.removeOneFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(PersonnelApiActions.updateOneSuccess, (state, { personnel }) => {
    return adapter.upsertOne(personnel, state);
  }),
  on(PersonnelApiActions.updateOneFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(PersonnelApiActions.loadAllSuccess, (state, { personnel }) => {
    return adapter.setAll(personnel, {
      ...state,
      loaded: true,
      loading: false
    })
  }),
  on(PersonnelApiActions.loadAllFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(PersonnelApiActions.loadOneSuccess, (state, { personnel }) => {
    return adapter.addOne(personnel, {
      ...state,
      loaded: true,
      loading: false
    })
  }),
  on(PersonnelApiActions.loadOneFailure, (state, { error }) => ({
    ...state,
    error: error
  })),

  // PERSONNEL BY ROLES

  on(PersonnelApiActions.loadAllRolesSuccess, (state, { roles }) => {
    return {
      ...state,
      roles: roles
    }
  }),
  on(PersonnelApiActions.loadPersonnelAvailabilitySuccess, (state, { personnelAvailability }) => {
    return {
      ...state,
      personnelAvailability: personnelAvailability
    }
  }),

  // on(PersonnelApiActions.setRolesSuccess, (state, { roles }) => {
  //   return adapter.upsertOne(roles, state);
  // }),
  // on(PersonnelApiActions.setRolesFailure, (state, { error }) => ({
  //   ...state,
  //   error: error
  // })),


  //PERSONNEL BY FCIF ID

  on(PersonnelListActions.getAllByFcifId, (state) => ({
    ...state,
    loading: true,
  })),
  on(PersonnelApiActions.loadAllByFcifIdSuccess, (state, { personnel }) => {
    return adapter.setAll(personnel, {
      ...state,
      loaded: true,
      loading: false,
      personnelByFcifId: personnel
    })
  }),
  on(PersonnelApiActions.loadAllByFcifIdFailure, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(PersonnelListActions.getAllGroupsPersonnel, (state) => ({
    ...state,
    loading: true,
  })),
  on(PersonnelApiActions.loadAllGroupsPersonnelSuccess, (state, { groupsPersonnel }) => {
    return {
      ...state,
      groupsPersonnel: groupsPersonnel
    }
  }),

  on(PersonnelApiActions.loadAllGroupsPersonnelFailure, (state, { error }) => ({
    ...state,
    error: error
  })),

  //FCIF PERSONNEL LIST

  on(PersonnelListActions.addToFcifPersonnelList, (state, { personnel }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      fcifPersonnelList: state.fcifPersonnelList.filter(item => item.id != personnel.id).concat(personnel)
    }
  }),
  on(PersonnelListActions.removeOneFromFcifPersonnelList, (state, { personnel }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      fcifPersonnelList: state.fcifPersonnelList.filter(item => item.id != personnel.id)
    }
  }),
  on(PersonnelListActions.removeAllFromFcifPersonnelList, (state, { }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      fcifPersonnelList: []
    }
  }),

  on(PersonnelListActions.setSelectedGroups, (state, { groups }) => ({
    ...state,
    selectedGroups: groups
  })),
);


export const getLoaded = (state: PersonnelState) => state.loaded;

export const getLoading = (state: PersonnelState) => state.loading;

export const getActionsSelectedPersonnel = (state: PersonnelState) => state.actionsSelectedPersonnel;

export const getSetPersonnelPasswordPopupVisible = (state: PersonnelState) => state.setPersonnelPasswordPopupOpened;

export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();

export const getEntityById = (id: string) => (state: PersonnelState) => state.entities[id];

export const getCurrentPersonnel = (state: PersonnelState) => state.selectedPersonnel;

export const getSelectedPersonnels = (state: PersonnelState) => state.selectedPersonnels.slice();

export const selectPersonnelByFcifId = (state: PersonnelState) => state.personnelByFcifId;

export const selectFcifPersonnelList = (state: PersonnelState) => state.fcifPersonnelList;

export const selectRolesListWithoutMainAdmin = (state: PersonnelState) => state.roles.filter(role => !role.isMainAdminRole);

export const selectRolesListWithMainAdmin = (state: PersonnelState) => state.roles;

export const selectGroupsPersonnel = (state: PersonnelState) => state.groupsPersonnel;

export const getPersonnelParams = (state: PersonnelState) => state.personnelParams;

export const getSelectedGroups = (state: PersonnelState) => state.selectedGroups;

export const getPersonnelAvailability = (state: PersonnelState) => state.personnelAvailability.slice();