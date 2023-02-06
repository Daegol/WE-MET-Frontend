import { createFeatureSelector } from '@ngrx/store';
import { State } from '@we-met-app/root-store/root-state';
import { DictionariesStore } from '@we-met-app/root-store';
import { dictionariesFeatureKey } from '../dictionaries-state';

export const selectDictionariesState = createFeatureSelector<State, DictionariesStore.DictionariesState>(
    dictionariesFeatureKey
);