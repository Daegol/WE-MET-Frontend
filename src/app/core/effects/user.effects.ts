import { Injectable } from '@angular/core';

import { fromEvent, merge, of, timer } from 'rxjs';
import { map, mergeMap, switchMapTo, withLatestFrom } from 'rxjs/operators';
import * as fromRoot from '@we-met-app/root-store/root-state';
import { createEffect } from '@ngrx/effects';
import { UserActions } from '@we-met-app/core/actions';
import { MatDialog } from '@angular/material/dialog';
import { IdleWarningDialogComponent } from '@we-met-app/shared/components/idle-warning-dialog/idle-warning-dialog.component';
import { Store } from '@ngrx/store';
import { LayoutSelectors } from '@we-met-app/root-store';

@Injectable()
export class UserEffects {
  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  idle$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      switchMapTo(timer(10 * 60 * 1000)), // 10 minute inactivity timeout
      map(() => UserActions.idleTimeout(), UserActions.idleTimeoutWarningDismiss())
    )
  );

  idleWarning$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      switchMapTo(timer(9 * 60 * 1000)), // 9 minute inactivity timeout
      withLatestFrom(this.store.select(LayoutSelectors.selectLayoutParams)),
      mergeMap(([, params]) => {
        if (params[0].isLoggedIn && !params[0].timeoutWarning) {
          const dialogRef = this.dialog.open<
            IdleWarningDialogComponent,
            undefined,
            boolean>(IdleWarningDialogComponent, { disableClose: true });
          this.store.dispatch(UserActions.idleTimeoutWarning());
          return dialogRef.afterClosed().pipe(
            map(() => {
              this.store.dispatch(UserActions.idleTimeoutWarningDismiss());
            }))
        } return of(null);
      }),
    ),
    { dispatch: false }
  )

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) { }
}
