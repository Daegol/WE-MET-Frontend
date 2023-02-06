import { createAction, props } from '@ngrx/store';

export const changeOnePassword = createAction(
    '[My Page Profile] Change password',
    props<{ password: string }>()
);
