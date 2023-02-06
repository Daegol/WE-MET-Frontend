import { createAction, props } from '@ngrx/store';

export const openChangePasswordDialog = createAction(
    '[My Page] Open Change Password popup'
);

export const closeChangePasswordDialog = createAction(
    '[My Page] Close Change Password popup'
);

export const openSelectedFcifDetails = createAction(
    '[My Page] Open selected fcif details',
    props<{ id: string }>()
);

export const openSelectedFlightDetails = createAction(
    '[My Page] Open selected flight details',
    props<{ id: string }>()
);
export const openSelectedTrainingDetails = createAction(
    '[My Page] Open selected training details',
    props<{ id: string }>()
);