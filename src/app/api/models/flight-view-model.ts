/* tslint:disable */
import { CrewViewModel } from './crew-view-model';
export interface FlightViewModel {
  actualFlyingHours?: null | number;
  actualLandTime?: null | string;
  actualTakeOffTime?: null | string;
  aircraftConfiguration?: null | string;
  aircraftID?: null | string;
  aircraftTailNumber?: null | string;
  aircraftTypeID?: string;
  aircraftTypeName?: null | string;
  callSign?: null | string;
  flightCrews?: null | Array<CrewViewModel>;
  flightTypeID?: null | string;
  flightTypeName?: null | string;
  flyingScheduleAccepted?: boolean;
  flyingScheduleDate?: null | string;
  flyingScheduleID?: null | string;
  flyingScheduleName?: null | string;
  id?: string;
  scheduledFlyingHours?: null | number;
  scheduledLandTime?: null | string;
  scheduledTakeOffTime?: null | string;
  squadronID?: string;
  squadronName?: null | string;
}
