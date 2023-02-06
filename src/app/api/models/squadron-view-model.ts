/* tslint:disable */
import { SquadronMdsViewModel } from './squadron-mds-view-model';
export interface SquadronViewModel {
  cityID: string;
  cityName?: null | string;
  icao?: null | string;
  id?: string;
  name: string;
  number: string;
  squadronMDS?: null | string;
  squadronMDSs?: null | Array<SquadronMdsViewModel>;
}
