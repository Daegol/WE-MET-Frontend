import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
    PurchasesApiActions,
    PurchasesPageActions,
    PurchasesDetailsActions
} from '@we-met-app/purchase/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PurchaseDto } from '@we-met-app/api/models';
import { from, of } from 'rxjs';
import { PurchaseService } from '@we-met-app/api/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { NewPurchaseComponent } from '@we-met-app/purchase/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { Router } from '@angular/router';
import { messageSuccessCreate, messageSuccessDelete, messageSuccessUpdate } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { Location } from '@angular/common';

@Injectable()
export class PurchasesEffects {

    mapToPurchase(body): PurchaseDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.getAll, PurchasesPageActions.getAllFromFlights),
            switchMap(() =>
                this.purchaseService.apiPurchaseGet$Json$Response().pipe(
                    map((response) =>
                        PurchasesApiActions.loadAllSuccess({ purchases: this.mapToPurchase(response?.body) })
                    ),
                    catchError((error) =>
                        of(PurchasesApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesDetailsActions.getOne),
            switchMap((action) =>
                this.purchaseService.apiPurchaseIdGet$Json({ id: action.id }).pipe(
                    map(response =>
                        PurchasesApiActions.loadOneSuccess({ purchases: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(PurchasesApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.removeMany),
            exhaustMap((action) =>
                from(action.purchases).pipe(
                    map((purchase) =>
                        PurchasesPageActions.removeOne({ id: purchase.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.removeOne, PurchasesDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.purchaseService.apiPurchaseDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [PurchasesApiActions.removeOneSuccess({ id: id }),
                        PurchasesPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(PurchasesApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.createNew),
            switchMap((action) =>
                this.purchaseService.apiPurchasePost$Json({ body: action.purchase }).pipe(
                    map(() =>
                        PurchasesApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(PurchasesApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesDetailsActions.updateOne),
            switchMap((action) =>
                this.purchaseService.apiPurchaseGet$Json({ body: action.purchase }).pipe(
                    map(() =>
                        PurchasesApiActions.updateOneSuccess({ purchase: action.purchase })
                    ),
                    catchError((error) =>
                        of(PurchasesApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PurchasesApiActions.updateOneSuccess),
                tap(() => {
                    this.location.back();
                })
            ),
        { dispatch: false }
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesApiActions.addOneSuccess),
            switchMap(() =>
                [PurchasesPageActions.getAll(), PurchasesPageActions.closeNewDialog()]),
            tap(() => this.router.navigate(['/maintenance/purchases']))
        )
    );

    openNewPurchaseDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewPurchaseComponent,
                    undefined,
                    PurchaseDto
                >(NewPurchaseComponent);

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewPurchaseDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    closeDeletePurchaseDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.closeDeleteDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.purchases;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    DeleteConfirmationDialogComponent,
                    undefined,
                    boolean
                >(DeleteConfirmationDialogComponent, dialogConfig);
                return dialogRef.afterClosed().pipe(
                    map(r => {
                        return { action: action, response: r }
                    }));
            }),
            map(({ action, response }) =>
                response ? PurchasesPageActions.deleteOperation({ purchases: action.purchases }) : PurchasesPageActions.deleteConfirmationDismiss()
            )
        )
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.deleteOperation),
            switchMap((action) =>
                [PurchasesPageActions.removeMany({ purchases: action.purchases })]
            )
        )
    );

    setPurchasesParams = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesPageActions.setInitialSquadrons, PurchasesPageActions.setCurrentSquadrons, PurchasesPageActions.setInitialStatuses, PurchasesPageActions.setCurrentStatuses),
            map(() => PurchasesPageActions.getAll())
        )
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesApiActions.addOneFailure,
                PurchasesApiActions.loadAllFailure,
                PurchasesApiActions.loadOneFailure,
                PurchasesApiActions.removeOneFailure,
                PurchasesApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PurchasesApiActions.removeOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessDelete))
        ),
        { dispatch: false }
    )


    constructor(
        private actions$: Actions,
        private purchaseService: PurchaseService,
        private dialog: MatDialog,
        private snackbar: SnackBarComponent,
        private router: Router,
        private errorHandlerService: ErrorHandlerService,
        private location: Location
    ) { }
}
