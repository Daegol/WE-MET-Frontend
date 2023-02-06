/* tslint:disable */
import { UserRolesForSquadronViewModel } from './user-roles-for-squadron-view-model';
export interface PersonnelViewModel {
  callsign?: null | string;
  email?: null | string;
  firstName: string;
  id?: string;
  isLocked?: boolean;
  isMainAdmin?: boolean;
  isPersonnel: boolean;
  lastName: string;
  rankID: string;
  rankName?: null | string;
  rankShortname?: null | string;
  squadronID: string;
  squadronName?: null | string;
  userID?: string;
  userRolesForSquadron?: null | Array<UserRolesForSquadronViewModel>;
}
