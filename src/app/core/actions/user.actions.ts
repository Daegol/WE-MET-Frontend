import { createAction } from '@ngrx/store';

export const idleTimeout = createAction('[User] Idle Timeout');
export const idleTimeoutWarning = createAction('[User] Idle Timeout Warning');
export const idleTimeoutWarningDismiss = createAction('[User] Idle Timeout Warning Dismiss');
