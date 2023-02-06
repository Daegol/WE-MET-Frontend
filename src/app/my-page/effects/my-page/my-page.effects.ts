import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { MyPageActions, MyPageApiActions, MyPageProfileActions } from '@we-met-app/my-page/actions';
import { of } from 'rxjs';
import { exhaustMap, tap, switchMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MyPageChangePasswordComponent } from '@we-met-app/my-page/components';
// import { PersonnelService } from '@we-met-app/api/services';
import { messageSuccessUpdate } from '@we-met-app/globals/globals';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';

@Injectable()
export class MyPageEffects {

    openChangePasswordDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyPageActions.openChangePasswordDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    MyPageChangePasswordComponent,
                    undefined,
                    PersonnelChangePasswordViewModel
                >(MyPageChangePasswordComponent, { disableClose: true });
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeChangePasswordDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyPageActions.closeChangePasswordDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    // changeOnePassword$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(MyPageProfileActions.changeOnePassword),
    //         switchMap((action) =>
    //             this.personnelService.apiPersonnelChangePasswordPut({ body: action.password }).pipe(
    //                 map(() =>
    //                     MyPageApiActions.changeOnePasswordSuccess({ password: action.password })
    //                 ),
    //                 catchError((error) =>
    //                     of(MyPageApiActions.changeOnePasswordFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //                 )
    //             )
    //         )
    //     )
    // );

    changeOnePasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MyPageApiActions.changeOnePasswordSuccess),
                tap(() => {
                    this.dialog.closeAll();
                })
            ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyPageApiActions.changeOnePasswordFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyPageApiActions.changeOnePasswordSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private dialog: MatDialog,
        // private personnelService: PersonnelService,
        private snackbar: SnackBarComponent,
        private errorHandlerService: ErrorHandlerService
    ) { }
}

export interface PersonnelChangePasswordViewModel {
    confirmPassword?: null | string;
    oldPassword: string;
    password: string;
}