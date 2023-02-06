/* tslint:disable */
import { TrainingTaskViewModel } from './training-task-view-model';
export interface GroupViewModel {
  id?: string;
  name?: null | string;
  squadron?: null | string;
  squadronId?: string;
  trainingTasks?: null | Array<TrainingTaskViewModel>;
}
