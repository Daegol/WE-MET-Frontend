import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    CopperApiActions,
    CopperDetailsActions,
    CopperPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { CopperDetailsComponent, NewCopperComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, copperCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class CopperEffects {

    mapToCopper(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: copperCategoryId }).pipe(
                    map((response) =>
                        CopperApiActions.loadAllSuccess({ coppers: this.mapToCopper(response?.body) })
                    ),
                    catchError((error) =>
                        of(CopperApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        CopperApiActions.loadOneSuccess({ coppers: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(CopperApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.copper }).pipe(
                    map(() =>
                        CopperApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(CopperApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.addOneSuccess),
            switchMap(() =>
                [CopperPageActions.getAll(), CopperPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.copper }).pipe(
                    map(() =>
                        CopperApiActions.updateOneSuccess({ copper: action.copper })
                    ),
                    catchError((error) =>
                        of(CopperApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CopperApiActions.updateOneSuccess),
                switchMap(() =>
                    [CopperPageActions.getAll(), CopperPageActions.closeEditDialog()])
            )
    );

    openEditCopperDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.copper;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    CopperDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(CopperDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditCopperDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.deleteOperation),
            switchMap((action) =>
                [CopperPageActions.removeMany({ coppers: action.coppers })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.coppers;
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
                response ? CopperPageActions.deleteOperation({ coppers: action.coppers }) : CopperPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.removeMany),
            switchMap((action) =>
                from(action.coppers).pipe(
                    map((copper) =>
                        CopperPageActions.removeOne({ id: copper.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.removeOne, CopperDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [CopperApiActions.removeOneSuccess({ id: id }),
                        CopperPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(CopperApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.removeOneSuccess),
            switchMap(() =>
                [CopperPageActions.getAll(), CopperPageActions.closeDeleteDialog()])
        )
    );

    openNewCopperDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewCopperComponent,
                    undefined,
                    NewCopperComponent
                >(NewCopperComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewCopperDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.addOneFailure,
                CopperApiActions.loadAllFailure,
                CopperApiActions.loadOneFailure,
                CopperApiActions.removeOneFailure,
                CopperApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CopperApiActions.removeOneSuccess),
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
