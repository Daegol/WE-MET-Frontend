import { createAction, props } from '@ngrx/store';

export const toggleSidenav = createAction('[Layout] Toggle Sidenav');
export const openSidenav = createAction('[Layout] Open Sidenav');
export const setTitle = createAction('[Layout] Set title', props<{ title: string }>());
export const setCurrentUrl = createAction('[Layout] Set url', props<{ url: string }>());
