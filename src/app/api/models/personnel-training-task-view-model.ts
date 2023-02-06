/* tslint:disable */
import { TrainingTaskViewModel } from './training-task-view-model';
export interface PersonnelTrainingTaskViewModel {
  duration?: number;
  executionDate?: null | string;
  id?: string;
  personnel?: null | string;
  personnelId?: string;
  remarks?: null | string;
  toBeFinishedBy?: string;
  trainingTask?: TrainingTaskViewModel;
  trainingTaskId?: string;
}
