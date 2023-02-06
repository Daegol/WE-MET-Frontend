/* tslint:disable */
import { CrewCreateUpdateViewModel } from './crew-create-update-view-model';
export interface FlightCreateUpdateViewModel {
  actualFlyingHours?: null | number;
  actualLandTime?: null | string;
  actualTakeOffTime?: null | string;
  aircraftConfiguration?: null | string;
  aircraftID?: null | string;
  aircraftTypeID?: string;
  callSign?: null | string;
  flightCrews?: null | Array<CrewCreateUpdateViewModel>;
  flightTypeID?: null | string;
  flyingScheduleID?: null | string;
  id?: string;
  scheduledFlyingHours?: null | number;
  scheduledLandTime?: null | string;
  scheduledTakeOffTime?: null | string;
  squadronID?: string;
}
