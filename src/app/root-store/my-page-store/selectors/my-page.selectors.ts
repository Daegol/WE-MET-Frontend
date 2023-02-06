import { createFeatureSelector } from '@ngrx/store';
import { State } from '@we-met-app/root-store/root-state';
import { myPageFeatureKey } from '../my-page-state';
import { MyPageStore } from '@we-met-app/root-store';

export const selectMyPageState = createFeatureSelector<State, MyPageStore.MyPageState>(
    myPageFeatureKey
);