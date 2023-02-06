import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    OtherApiActions,
    OtherDetailsActions,
    OtherPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { OtherDetailsComponent, NewOtherComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, otherCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class OtherEffects {

    mapToOther(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: otherCategoryId }).pipe(
                    map((response) =>
                        OtherApiActions.loadAllSuccess({ others: this.mapToOther(response?.body) })
                    ),
                    catchError((error) =>
                        of(OtherApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        OtherApiActions.loadOneSuccess({ others: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(OtherApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.other }).pipe(
                    map(() =>
                        OtherApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(OtherApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.addOneSuccess),
            switchMap(() =>
                [OtherPageActions.getAll(), OtherPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.other }).pipe(
                    map(() =>
                        OtherApiActions.updateOneSuccess({ other: action.other })
                    ),
                    catchError((error) =>
                        of(OtherApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(OtherApiActions.updateOneSuccess),
                switchMap(() =>
                    [OtherPageActions.getAll(), OtherPageActions.closeEditDialog()])
            )
    );

    openEditOtherDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.other;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    OtherDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(OtherDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditOtherDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.deleteOperation),
            switchMap((action) =>
                [OtherPageActions.removeMany({ others: action.others })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.others;
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
                response ? OtherPageActions.deleteOperation({ others: action.others }) : OtherPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.removeMany),
            switchMap((action) =>
                from(action.others).pipe(
                    map((other) =>
                        OtherPageActions.removeOne({ id: other.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.removeOne, OtherDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [OtherApiActions.removeOneSuccess({ id: id }),
                        OtherPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(OtherApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.removeOneSuccess),
            switchMap(() =>
                [OtherPageActions.getAll(), OtherPageActions.closeDeleteDialog()])
        )
    );

    openNewOtherDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewOtherComponent,
                    undefined,
                    NewOtherComponent
                >(NewOtherComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewOtherDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.addOneFailure,
                OtherApiActions.loadAllFailure,
                OtherApiActions.loadOneFailure,
                OtherApiActions.removeOneFailure,
                OtherApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtherApiActions.removeOneSuccess),
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
