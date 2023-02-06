import { Dictionary } from '@ngrx/entity'
import { createSelector } from '@ngrx/store'
import { GroupPersonnelViewModel, PersonnelViewModel } from '@we-met-app/api/models'
import * as fromPersonnel from '@we-met-app/root-store/administration-store/reducers/personnel.reducer'
import { selectAdministrationState } from './administration.selectors'

export const selectPersonnelState = createSelector(
    selectAdministrationState,
    (state) => state.personnel
)

export const selectActionsSelectedPersonnel = createSelector(
    selectPersonnelState,
    fromPersonnel.getActionsSelectedPersonnel
)

export const selectSelectedPersonnels = createSelector(
    selectPersonnelState,
    fromPersonnel.getSelectedPersonnels
)

export const selectPersonnel = createSelector(
    selectPersonnelState,
    fromPersonnel.selectAll
)

export const selectCurrentPersonnel = createSelector(
    selectPersonnelState,
    fromPersonnel.getCurrentPersonnel
)

export const selectPersonnelEntities = createSelector(
    selectPersonnelState,
    fromPersonnel.selectEntities
)

export const selectSelectedGroups = createSelector(
    selectPersonnelState,
    fromPersonnel.getSelectedGroups
)

export const getPersonnelById = () => {
    return createSelector(
        selectPersonnelEntities,
        (entities: Dictionary<PersonnelViewModel>, props: { id: string }) => {
            return entities[props.id]
        },
    )
}

export const selectIsSetPersonnelPasswordPopupVisible = createSelector(
    selectPersonnelState,
    fromPersonnel.getSetPersonnelPasswordPopupVisible
)

export const selectRolesListWithMainAdmin = createSelector(
    selectPersonnelState,
    fromPersonnel.selectRolesListWithMainAdmin
)

export const selectRolesListWithoutMainAdmin = createSelector(
    selectPersonnelState,
    fromPersonnel.selectRolesListWithoutMainAdmin
)

export const selectPersonnelAvailability = createSelector(
    selectPersonnelState,
    fromPersonnel.getPersonnelAvailability
)

export const selectPersonnelParams = createSelector(
    selectPersonnelState,
    fromPersonnel.getPersonnelParams
)

export const selectPersonnelByFcifId = createSelector(
    selectPersonnelState,
    fromPersonnel.selectPersonnelByFcifId
)

export const selectFcifPersonnelList = createSelector(
    selectPersonnelState,
    fromPersonnel.selectFcifPersonnelList
)

export const selectSetRoles = createSelector(
    selectPersonnelState,
    fromPersonnel.selectAll
)

export const selectSetGroupsPersonnel = createSelector(
    selectPersonnelState,
    fromPersonnel.selectGroupsPersonnel
)

export const selectGroupsPersonnelByPersonnelId = () => {
    return createSelector(
        selectSetGroupsPersonnel,
        (entities: GroupPersonnelViewModel[], props: { id: string }) => {
            return entities.filter(p => p.personnelId === props.id)
        },
    )
}