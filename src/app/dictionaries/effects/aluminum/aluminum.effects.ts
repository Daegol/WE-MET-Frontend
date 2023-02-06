import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    AluminumApiActions,
    AluminumDetailsActions,
    AluminumPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { AluminumDetailsComponent, NewAluminumComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, alumunimumCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class AluminumEffects {

    mapToAluminum(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: alumunimumCategoryId }).pipe(
                    map((response) =>
                        AluminumApiActions.loadAllSuccess({ aluminums: this.mapToAluminum(response?.body) })
                    ),
                    catchError((error) =>
                        of(AluminumApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        AluminumApiActions.loadOneSuccess({ aluminums: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(AluminumApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.aluminum }).pipe(
                    map(() =>
                        AluminumApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(AluminumApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.addOneSuccess),
            switchMap(() =>
                [AluminumPageActions.getAll(), AluminumPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.aluminum }).pipe(
                    map(() =>
                        AluminumApiActions.updateOneSuccess({ aluminum: action.aluminum })
                    ),
                    catchError((error) =>
                        of(AluminumApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AluminumApiActions.updateOneSuccess),
                switchMap(() =>
                    [AluminumPageActions.getAll(), AluminumPageActions.closeEditDialog()])
            )
    );

    openEditAluminumDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.aluminum;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    AluminumDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(AluminumDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditAluminumDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.deleteOperation),
            switchMap((action) =>
                [AluminumPageActions.removeMany({ aluminums: action.aluminums })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.aluminums;
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
                response ? AluminumPageActions.deleteOperation({ aluminums: action.aluminums }) : AluminumPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.removeMany),
            switchMap((action) =>
                from(action.aluminums).pipe(
                    map((aluminum) =>
                        AluminumPageActions.removeOne({ id: aluminum.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.removeOne, AluminumDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [AluminumApiActions.removeOneSuccess({ id: id }),
                        AluminumPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(AluminumApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.removeOneSuccess),
            switchMap(() =>
                [AluminumPageActions.getAll(), AluminumPageActions.closeDeleteDialog()])
        )
    );

    openNewAluminumDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewAluminumComponent,
                    undefined,
                    NewAluminumComponent
                >(NewAluminumComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewAluminumDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.addOneFailure,
                AluminumApiActions.loadAllFailure,
                AluminumApiActions.loadOneFailure,
                AluminumApiActions.removeOneFailure,
                AluminumApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AluminumApiActions.removeOneSuccess),
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
