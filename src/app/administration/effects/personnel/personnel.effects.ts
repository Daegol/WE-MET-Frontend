import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    PersonnelListActions,
    PersonnelApiActions,
    PersonnelDetailsActions
} from '@we-met-app/administration/actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RegisterUserViewModel } from '@we-met-app/api/models/register-user-view-model';
// import { AccountService, PersonnelService, RoleService } from '@we-met-app/api/services';
import { from, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPersonnelComponent } from '@we-met-app/administration/components';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { GroupViewModel, PersonnelSetNewPasswordViewModel, PersonnelViewModel } from '@we-met-app/api/models';
import { SetPersonnelPasswordComponent } from '@we-met-app/administration/components';
import { messageSuccessCreate, messageSuccessDelete, messageSuccessUpdate } from '@we-met-app/globals/globals';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';
import { AddGroupComponent } from '@we-met-app/administration/components/personnel/personnel-detail/personnel-detail-groups/personnel-detail-add-group/add-group.component';
// import { GroupPersonnelService } from '@we-met-app/api/services/group-personnel.service';
import { Store } from '@ngrx/store';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';
import { PersonnelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Injectable()
export class PersonnelEffects {

    // getAll$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.getAll, PersonnelListActions.getAllFromMyPage, PersonnelListActions.getAllFromPersonnelDetails, PersonnelListActions.getAllFromNewPTL,
    //     //         PersonnelListActions.getAllFromTraining, PersonnelListActions.getAllFromCommitmentBoard),
    //     //     switchMap(() =>
    //     //         this.personnelService.apiPersonnelGet$Json().pipe(
    //     //             map(response =>
    //     //                 PersonnelApiActions.loadAllSuccess({ personnel: response })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadAllFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // getAllByFcifId$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.getAllByFcifId),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelGetAllPersonnelByFcifIdGet$Json({ fcifId: action.fcifId }).pipe(
    //     //             map((personnel: PersonnelViewModel[]) =>
    //     //                 PersonnelApiActions.loadAllByFcifIdSuccess({ personnel })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadAllByFcifIdFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // getPersonnelAvailability$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.getPersonnelAvailability),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelAvailabilityGet$Json({ squadronId: action.squadronId, from: action.from, to: action.to }).pipe(
    //     //             map((response) =>
    //     //                 PersonnelApiActions.loadPersonnelAvailabilitySuccess({ personnelAvailability: response })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadPersonnelAvailabilityFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // getGroupPersonnelByPersonnelId$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.getAllGroupsPersonnel),
    //     //     withLatestFrom(this.store.select(PersonnelSelectors.selectPersonnelParams)),
    //     //     switchMap(([, params]) =>
    //     //         this.groupPersonnelService.getByPersonnelIdIdGet$Json({ id: params.currentPersonnelId }).pipe(
    //     //             map((groupsPersonnel: GroupPersonnelViewModel[]) =>
    //     //                 PersonnelApiActions.loadAllGroupsPersonnelSuccess({ groupsPersonnel: groupsPersonnel })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadAllGroupsPersonnelFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // getOne$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelDetailsActions.getOne, PersonnelListActions.getOneFromMyPage),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelIdGet$Json({ id: action.id }).pipe(
    //     //             map(response =>
    //     //                 PersonnelApiActions.loadOneSuccess({ personnel: response })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    deleteConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.deleteConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.personnel;
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
                response ? PersonnelListActions.deleteOperation({ personnel: action.personnel }) : PersonnelListActions.deleteConfirmationDismiss()
            )
        )
    );

    // addOneGroup$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.addGroup),
    //     //     switchMap((action) =>
    //     //         this.groupPersonnelService.apiGroupPersonnelPost({ body: action.groupPersonnel }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.addOneGroupSuccess()
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.addOneGroupFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    deleteGroupConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.deleteGroupConfirmation),
            exhaustMap((action) => {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = action.groupsPersonnel;
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
                response ? PersonnelListActions.deleteGroupOperation({ groupsPersonnel: action.groupsPersonnel }) : PersonnelListActions.deleteGroupConfirmationDismiss()
            )
        )
    );

    deleteGroupOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.deleteGroupOperation),
            switchMap((action) =>
                [PersonnelListActions.removeManyGroup({ groupsPersonnel: action.groupsPersonnel })]
            )
        )
    );

    removeManyGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.removeManyGroup),
            switchMap((action) =>
                from(action.groupsPersonnel).pipe(
                    map((groupsPersonnel) =>
                        PersonnelListActions.removeOneGroup({ id: groupsPersonnel.id })
                    )
                )
            )
        )
    );

    // removeOneGroup$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.removeOneGroup, PersonnelDetailsActions.removeOneGroup),
    //     //     mergeMap(({ id }) =>
    //     //         this.groupPersonnelService.apiGroupPersonnelIdDelete({ id: id }).pipe(
    //     //             mergeMap(() =>
    //     //                 [PersonnelApiActions.removeOneGroupSuccess({ id: id }),
    //     //                 PersonnelListActions.removeOneGroupFromSelected({ id: id })]
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.removeOneGroupFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    deleteOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.deleteOperation),
            switchMap((action) =>
                [PersonnelListActions.removeMany({ personnels: action.personnel })]
            )
        )
    );

    removeMany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.removeMany),
            switchMap((action) =>
                from(action.personnels).pipe(
                    map((personnel) =>
                        PersonnelListActions.removeOne({ id: personnel.id })
                    )
                )
            )
        )
    );

    // removeOne$ = createEffect(
    //     () => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.removeOne, PersonnelDetailsActions.removeOne),
    //     //     mergeMap(({ id }) =>
    //     //         this.personnelService.apiPersonnelIdDelete({ id: id }).pipe(
    //     //             mergeMap(() =>
    //     //                 [PersonnelApiActions.removeOneSuccess({ id: id }),
    //     //                 PersonnelListActions.removeOneFromSelected({ id: id })]
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.removeOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // createOne$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.createNew),
    //     //     switchMap((action) =>
    //     //         this.accountService.apiAccountRegisterPost({ body: action.personnel }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.addOneSuccess()
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.addOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // updateOne$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelDetailsActions.updateOne),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelPut({ body: action.personnel }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.updateOneSuccess({ personnel: action.personnel })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.updateOneFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    updateOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.updateOneSuccess),
            map(() => PersonnelListActions.getAll())
        ),
        { dispatch: false }
    );

    removeOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.removeOneSuccess),
            switchMap(() =>
                [PersonnelListActions.getAll(), PersonnelListActions.closeDeleteDialog()])
        )
    );


    addOneSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.addOneSuccess),
            switchMap(() =>
                [PersonnelListActions.getAll(), PersonnelListActions.closeNewDialog()])
        )
    );

    removeOneGroupSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.removeOneGroupSuccess),
            switchMap(() =>
                [PersonnelListActions.getAllGroupsPersonnel(), PersonnelListActions.closeDeleteDialog()])
        )
    );

    addOneGroupSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.addOneGroupSuccess),
            switchMap(() =>
                [PersonnelListActions.getAllGroupsPersonnel(), PersonnelListActions.closeAddGroupDialog()])
        )
    );

    openNewPersonnelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.openNewDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    NewPersonnelComponent,
                    undefined,
                    RegisterUserViewModel
                >(NewPersonnelComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    openAddGroupDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.openAddGroupDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    AddGroupComponent,
                    undefined,
                    GroupViewModel
                >(AddGroupComponent, { disableClose: true });

                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeAddGroupDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.closeAddGroupDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    closeNewPersonnelDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.closeNewDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    closeDeleteSquadronDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.closeDeleteDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    openSetPersonnelPasswordDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.openSetPasswordDialog),
            exhaustMap(() => {
                const dialogRef = this.dialog.open<
                    SetPersonnelPasswordComponent,
                    undefined,
                    PersonnelSetNewPasswordViewModel
                >(SetPersonnelPasswordComponent, { disableClose: true });
                return dialogRef.afterOpened();
            })
        ),
        { dispatch: false }
    );

    closeSetPersonnelPasswordDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.closeSetPasswordDialog),
            tap(() => {
                this.dialog.closeAll();
            })
        ),
        { dispatch: false }
    );

    // updateOnePassword$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelDetailsActions.updateOnePassword),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelSetPasswordPut({ body: action.password }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.updateOnePasswordSuccess({ password: action.password })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.updateOnePasswordFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    updateOnePasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PersonnelApiActions.updateOnePasswordSuccess),
                tap(() => {
                    this.dialog.closeAll();
                })
            ),
        { dispatch: false }
    );

    // setRoles$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelDetailsActions.setRoles),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelSetRolesPut({ body: action.roles }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.setRolesSuccess({ roles: action.roles })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.setRolesFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    // setRolesSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(PersonnelApiActions.setRolesSuccess),
    //         switchMap(() =>
    //             [PersonnelListActions.getAll()]
    //         )
    //     ),
    // );

    // setAllRoles$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelDetailsActions.setAllRoles),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelSetAllRolesPut({ body: action.roles }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.setAllRolesSuccess({ roles: action.roles })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.setAllRolesFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    setAllRolesSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.setAllRolesSuccess),
            switchMap(() =>
                [PersonnelListActions.getAll()]
            )
        ),
    );

    // setMainAdminRole$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.setMainAdminRole),
    //     //     switchMap((action) =>
    //     //         this.personnelService.apiPersonnelSetMainAdminRolePut({ body: action.mainAdmin }).pipe(
    //     //             map(() =>
    //     //                 PersonnelApiActions.setMainAdminRoleSuccess({ mainAdmin: action.mainAdmin })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.setMainAdminRoleFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // );

    setMainAdminRoleSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.setMainAdminRoleSuccess),
            switchMap(() =>
                [PersonnelListActions.getAll()]
            )
        ),
    );

    // getRolesSuccess$ = createEffect(() => null
    //     // this.actions$.pipe(
    //     //     ofType(PersonnelListActions.getAllRoles),
    //     //     switchMap(() =>
    //     //         this.roleService.apiRoleGet$Json().pipe(
    //     //             map(response =>
    //     //                 PersonnelApiActions.loadAllRolesSuccess({ roles: response })
    //     //             ),
    //     //             catchError((error) =>
    //     //                 of(PersonnelApiActions.loadAllRolesFailure({ error: this.errorHandlerService.parseErrors(error) }))
    //     //             )
    //     //         )
    //     //     )
    //     // )
    // )

    setPersonnelParams = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelListActions.setInitialSquadrons, PersonnelListActions.setCurrentSquadrons),
            map(() => PersonnelListActions.getAll())
        )
    );

    handleErrors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.addOneFailure,
                PersonnelApiActions.loadAllFailure,
                PersonnelApiActions.loadOneFailure,
                PersonnelApiActions.removeOneFailure,
                PersonnelApiActions.updateOneFailure,
                PersonnelApiActions.loadOneFailure,
                PersonnelApiActions.removeOneFailure,
                PersonnelApiActions.updateOneFailure,
                PersonnelApiActions.updateOnePasswordFailure,
                PersonnelApiActions.setRolesFailure,
                PersonnelApiActions.setAllRolesFailure,
                PersonnelApiActions.loadAllRolesFailure,
                PersonnelApiActions.setMainAdminRoleFailure,
                PersonnelApiActions.loadAllGroupsPersonnelFailure,
                PersonnelApiActions.addOneGroupFailure,
                PersonnelApiActions.removeOneGroupFailure),
            tap((action) => this.snackbar.showError(action.error))
        ),
        { dispatch: false }
    )

    handleCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.addOneSuccess, PersonnelApiActions.addOneGroupSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessCreate))
        ),
        { dispatch: false }
    )

    handleUpdateRolesSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.setRolesSuccess, PersonnelApiActions.setMainAdminRoleSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleUpdateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.updateOneSuccess,
                PersonnelApiActions.updateOnePasswordSuccess,
                PersonnelApiActions.setRolesSuccess,
                PersonnelApiActions.setAllRolesSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessUpdate))
        ),
        { dispatch: false }
    )

    handleDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonnelApiActions.removeOneSuccess, PersonnelApiActions.removeOneGroupSuccess),
            tap(() => this.snackbar.showSuccess(messageSuccessDelete))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        // private personnelService: PersonnelService,
        // private accountService: AccountService,
        // private groupPersonnelService: GroupPersonnelService,
        // private roleService: RoleService,
        private dialog: MatDialog,
        private snackbar: SnackBarComponent,
        private errorHandlerService: ErrorHandlerService,
        private store: Store<State>
    ) { }
}
