import { createAction, props } from '@ngrx/store';

export const changeOnePasswordSuccess = createAction(
    '[My Page - Personnel/API] Change personnel password - Success',
    props<{ password: string }>()
);

export const changeOnePasswordFailure = createAction(
    '[My Page - Personnel/API] Change personnel password - Failure',
    props<{ error: string }>()
);