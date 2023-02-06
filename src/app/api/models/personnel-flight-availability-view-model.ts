/* tslint:disable */
import { Unavailibility } from './unavailibility';
export interface PersonnelFlightAvailabilityViewModel {
  callSign?: null | string;
  id?: string;
  notAvailable?: boolean;
  unavailibilities?: null | Array<Unavailibility>;
}
