import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    ZincAndLeadApiActions,
    ZincAndLeadDetailsActions,
    ZincAndLeadPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { ZincAndLeadDetailsComponent, NewZincAndLeadComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, zincAndLeadCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class ZincAndLeadEffects {

    mapToZincAndLead(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: zincAndLeadCategoryId }).pipe(
                    map((response) =>
                        ZincAndLeadApiActions.loadAllSuccess({ zincAndLeads: this.mapToZincAndLead(response?.body) })
                    ),
                    catchError((error) =>
                        of(ZincAndLeadApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        ZincAndLeadApiActions.loadOneSuccess({ zincAndLeads: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(ZincAndLeadApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.zincAndLead }).pipe(
                    map(() =>
                        ZincAndLeadApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(ZincAndLeadApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.addOneSuccess),
            switchMap(() =>
                [ZincAndLeadPageActions.getAll(), ZincAndLeadPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.zincAndLead }).pipe(
                    map(() =>
                        ZincAndLeadApiActions.updateOneSuccess({ zincAndLead: action.zincAndLead })
                    ),
                    catchError((error) =>
                        of(ZincAndLeadApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ZincAndLeadApiActions.updateOneSuccess),
                switchMap(() =>
                    [ZincAndLeadPageActions.getAll(), ZincAndLeadPageActions.closeEditDialog()])
            )
    );

    openEditZincAndLeadDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.zincAndLead;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    ZincAndLeadDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(ZincAndLeadDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditZincAndLeadDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.deleteOperation),
            switchMap((action) =>
                [ZincAndLeadPageActions.removeMany({ zincAndLeads: action.zincAndLeads })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.zincAndLeads;
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
                response ? ZincAndLeadPageActions.deleteOperation({ zincAndLeads: action.zincAndLeads }) : ZincAndLeadPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.removeMany),
            switchMap((action) =>
                from(action.zincAndLeads).pipe(
                    map((zincAndLead) =>
                        ZincAndLeadPageActions.removeOne({ id: zincAndLead.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.removeOne, ZincAndLeadDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [ZincAndLeadApiActions.removeOneSuccess({ id: id }),
                        ZincAndLeadPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(ZincAndLeadApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.removeOneSuccess),
            switchMap(() =>
                [ZincAndLeadPageActions.getAll(), ZincAndLeadPageActions.closeDeleteDialog()])
        )
    );

    openNewZincAndLeadDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewZincAndLeadComponent,
                    undefined,
                    NewZincAndLeadComponent
                >(NewZincAndLeadComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewZincAndLeadDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.addOneFailure,
                ZincAndLeadApiActions.loadAllFailure,
                ZincAndLeadApiActions.loadOneFailure,
                ZincAndLeadApiActions.removeOneFailure,
                ZincAndLeadApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZincAndLeadApiActions.removeOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessDelete))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private mainCategoryService: MainCategoryService,
        private subCategoryService: SubCategoryService,
        private dialog: MatDialog,
        private snackbar: SnackBarComponent,
        private errorHandlerService: ErrorHandlerService
    ) { }
}
