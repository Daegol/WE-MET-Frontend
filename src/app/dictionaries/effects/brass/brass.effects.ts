import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    BrassApiActions,
    BrassDetailsActions,
    BrassPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { BrassDetailsComponent, NewBrassComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, brassCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class BrassEffects {

    mapToBrass(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: brassCategoryId }).pipe(
                    map((response) =>
                        BrassApiActions.loadAllSuccess({ brasss: this.mapToBrass(response?.body) })
                    ),
                    catchError((error) =>
                        of(BrassApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        BrassApiActions.loadOneSuccess({ brasss: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(BrassApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.brass }).pipe(
                    map(() =>
                        BrassApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(BrassApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.addOneSuccess),
            switchMap(() =>
                [BrassPageActions.getAll(), BrassPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.brass }).pipe(
                    map(() =>
                        BrassApiActions.updateOneSuccess({ brass: action.brass })
                    ),
                    catchError((error) =>
                        of(BrassApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BrassApiActions.updateOneSuccess),
                switchMap(() =>
                    [BrassPageActions.getAll(), BrassPageActions.closeEditDialog()])
            )
    );

    openEditBrassDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.brass;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    BrassDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(BrassDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditBrassDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.deleteOperation),
            switchMap((action) =>
                [BrassPageActions.removeMany({ brasss: action.brasss })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.brasss;
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
                response ? BrassPageActions.deleteOperation({ brasss: action.brasss }) : BrassPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.removeMany),
            switchMap((action) =>
                from(action.brasss).pipe(
                    map((brass) =>
                        BrassPageActions.removeOne({ id: brass.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.removeOne, BrassDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [BrassApiActions.removeOneSuccess({ id: id }),
                        BrassPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(BrassApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.removeOneSuccess),
            switchMap(() =>
                [BrassPageActions.getAll(), BrassPageActions.closeDeleteDialog()])
        )
    );

    openNewBrassDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewBrassComponent,
                    undefined,
                    NewBrassComponent
                >(NewBrassComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewBrassDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.addOneFailure,
                BrassApiActions.loadAllFailure,
                BrassApiActions.loadOneFailure,
                BrassApiActions.removeOneFailure,
                BrassApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BrassApiActions.removeOneSuccess),
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
