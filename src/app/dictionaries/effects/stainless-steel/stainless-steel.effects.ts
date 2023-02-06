import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    StainlessSteelApiActions,
    StainlessSteelDetailsActions,
    StainlessSteelPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { StainlessSteelDetailsComponent, NewStainlessSteelComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, stainlessSteelCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class StainlessSteelEffects {

    mapToStainlessSteel(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: stainlessSteelCategoryId }).pipe(
                    map((response) =>
                        StainlessSteelApiActions.loadAllSuccess({ stainlessSteels: this.mapToStainlessSteel(response?.body) })
                    ),
                    catchError((error) =>
                        of(StainlessSteelApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        StainlessSteelApiActions.loadOneSuccess({ stainlessSteels: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(StainlessSteelApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.stainlessSteel }).pipe(
                    map(() =>
                        StainlessSteelApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(StainlessSteelApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.addOneSuccess),
            switchMap(() =>
                [StainlessSteelPageActions.getAll(), StainlessSteelPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.stainlessSteel }).pipe(
                    map(() =>
                        StainlessSteelApiActions.updateOneSuccess({ stainlessSteel: action.stainlessSteel })
                    ),
                    catchError((error) =>
                        of(StainlessSteelApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(StainlessSteelApiActions.updateOneSuccess),
                switchMap(() =>
                    [StainlessSteelPageActions.getAll(), StainlessSteelPageActions.closeEditDialog()])
            )
    );

    openEditStainlessSteelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.stainlessSteel;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    StainlessSteelDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(StainlessSteelDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditStainlessSteelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.deleteOperation),
            switchMap((action) =>
                [StainlessSteelPageActions.removeMany({ stainlessSteels: action.stainlessSteels })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.stainlessSteels;
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
                response ? StainlessSteelPageActions.deleteOperation({ stainlessSteels: action.stainlessSteels }) : StainlessSteelPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.removeMany),
            switchMap((action) =>
                from(action.stainlessSteels).pipe(
                    map((stainlessSteel) =>
                        StainlessSteelPageActions.removeOne({ id: stainlessSteel.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.removeOne, StainlessSteelDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [StainlessSteelApiActions.removeOneSuccess({ id: id }),
                        StainlessSteelPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(StainlessSteelApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.removeOneSuccess),
            switchMap(() =>
                [StainlessSteelPageActions.getAll(), StainlessSteelPageActions.closeDeleteDialog()])
        )
    );

    openNewStainlessSteelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewStainlessSteelComponent,
                    undefined,
                    NewStainlessSteelComponent
                >(NewStainlessSteelComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewStainlessSteelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.addOneFailure,
                StainlessSteelApiActions.loadAllFailure,
                StainlessSteelApiActions.loadOneFailure,
                StainlessSteelApiActions.removeOneFailure,
                StainlessSteelApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StainlessSteelApiActions.removeOneSuccess),
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
