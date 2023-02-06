import { createFeatureSelector } from '@ngrx/store';
import { AdministrationStore } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';
import { administrationFeatureKey } from '../administration-state';

export const selectAdministrationState = createFeatureSelector<State, AdministrationStore.AdministrationState>(
    administrationFeatureKey
);