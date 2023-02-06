import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    SteelScrapApiActions,
    SteelScrapDetailsActions,
    SteelScrapPageActions
} from '@we-met-app/dictionaries/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { SteelScrapDetailsComponent, NewSteelScrapComponent } from '@we-met-app/dictionaries/components';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { messageSuccessCreate, messageSuccessUpdate, messageSuccessDelete, steelScrapCategoryId } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { MainCategoryService } from '@we-met-app/api/services/main-category.service';
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';
import { SubCategoryService } from '@we-met-app/api/services';

@Injectable()
export class SteelScrapEffects {

    mapToSteelScrap(body): SubCategoryDto[] {
        return body?.data?.subCategories;
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.getAll),
            switchMap(() =>
                this.mainCategoryService.apiMainCategoryIdGet$Json$Response({ id: steelScrapCategoryId }).pipe(
                    map((response) =>
                        SteelScrapApiActions.loadAllSuccess({ steelScraps: this.mapToSteelScrap(response?.body) })
                    ),
                    catchError((error) =>
                        of(SteelScrapApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    getOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapDetailsActions.getOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryGet$Json({ id: action.id }).pipe(
                    map(response =>
                        SteelScrapApiActions.loadOneSuccess({ steelScraps: response?.data[0] })
                    ),
                    catchError((error) =>
                        of(SteelScrapApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    createOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.createNew),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPost$Json({ body: action.steelScrap }).pipe(
                    map(() =>
                        SteelScrapApiActions.addOneSuccess()
                    ),
                    catchError((error) =>
                        of(SteelScrapApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.addOneSuccess),
            switchMap(() =>
                [SteelScrapPageActions.getAll(), SteelScrapPageActions.closeNewDialog()])
        )
    );

    updateOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapDetailsActions.updateOne),
            switchMap((action) =>
                this.subCategoryService.apiSubCategoryPut$Json({ body: action.steelScrap }).pipe(
                    map(() =>
                        SteelScrapApiActions.updateOneSuccess({ steelScrap: action.steelScrap })
                    ),
                    catchError((error) =>
                        of(SteelScrapApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    updateOneSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(SteelScrapApiActions.updateOneSuccess),
                switchMap(() =>
                    [SteelScrapPageActions.getAll(), SteelScrapPageActions.closeEditDialog()])
            )
    );

    openEditSteelScrapDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.openEditDialog),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.steelScrap;
                dialogConfig.disableClose = true;
                const dialogRef = this.dialog.open<
                    SteelScrapDetailsComponent,
                    undefined,
                    SubCategoryDto
                >(SteelScrapDetailsComponent, dialogConfig);
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeEditSteelScrapDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.closeEditDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.deleteOperation),
            switchMap((action) =>
                [SteelScrapPageActions.removeMany({ steelScraps: action.steelScraps })]
            )
        )
    );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.steelScraps;
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
                response ? SteelScrapPageActions.deleteOperation({ steelScraps: action.steelScraps }) : SteelScrapPageActions.deleteConfirmationDismiss()
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.removeMany),
            switchMap((action) =>
                from(action.steelScraps).pipe(
                    map((steelScrap) =>
                        SteelScrapPageActions.removeOne({ id: steelScrap.id })
                    )
                )
            )
        )
    );

    removeOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.removeOne, SteelScrapDetailsActions.removeOne),
            mergeMap(({ id }) =>
                this.subCategoryService.apiSubCategoryDelete$Json({ id: id }).pipe(
                    mergeMap(() =>
                        [SteelScrapApiActions.removeOneSuccess({ id: id }),
                        SteelScrapPageActions.removeOneFromSelected({ id: id })]
                    ),
                    catchError((error) =>
                        of(SteelScrapApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
                    )
                )
            )
        )
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.removeOneSuccess),
            switchMap(() =>
                [SteelScrapPageActions.getAll(), SteelScrapPageActions.closeDeleteDialog()])
        )
    );

    openNewSteelScrapDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewSteelScrapComponent,
                    undefined,
                    NewSteelScrapComponent
                >(NewSteelScrapComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeNewSteelScrapDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapPageActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.addOneFailure,
                SteelScrapApiActions.loadAllFailure,
                SteelScrapApiActions.loadOneFailure,
                SteelScrapApiActions.removeOneFailure,
                SteelScrapApiActions.updateOneFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.addOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.updateOneSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SteelScrapApiActions.removeOneSuccess),
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
