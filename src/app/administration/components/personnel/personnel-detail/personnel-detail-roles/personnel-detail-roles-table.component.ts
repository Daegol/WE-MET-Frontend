import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PersonnelViewModel, UserRolesViewModel, SetRolesViewModel, RoleViewModel, UserRolesForSquadronViewModel } from '@we-met-app/api/models';
import { PersonnelDetailsActions, PersonnelListActions } from '@we-met-app/administration/actions';
import { Observable, Subscription } from 'rxjs';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles, administrationPersonnelRoles } from '@we-met-app/globals/globals';
import { AuthSelectors, PersonnelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-personnel-detail-roles-table',
  templateUrl: './personnel-detail-roles-table.component.html',
  styleUrls: ['./personnel-detail-roles-table.component.scss']
})
export class PersonnelDetailRolesTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentPersonnel: PersonnelViewModel;

  editRoles = this.fb.group({
    userRolesForSquadron: this.fb.array([])
  })

  isMainAdmin: boolean;
  mainAdminCheckbox: boolean;
  isAdminChecked: boolean;

  //isEditedUserMainAdmin: boolean;
  userRoles: SetRolesViewModel[];
  roleNames: Observable<RoleViewModel[]>;
  adminInSquadrons: string[] = [];
  private subscription = new Subscription();
  sortedRoles: Array<UserRolesForSquadronViewModel> = [];
  administrationPersonnelRoles = administrationPersonnelRoles;

  change(squadronId: string, role: UserRolesViewModel, checked: boolean) {
    !this.userRoles ? this.initUserRoles() : null;
    checked ? this.addRole(squadronId, role) : this.removeRole(squadronId, role);
  }

  hasAuthorityInSquadron(squadronId: string): boolean {
    return this.isMainAdmin ? true : this.adminInSquadrons.indexOf(squadronId) > -1;
  }

  addRole(squadronId: string, role: UserRolesViewModel) {
    let squadronRole = this.userRoles.find(item => item.squadronId == squadronId);
    let squadronRoleIndex = this.userRoles.indexOf(squadronRole);
    this.userRoles[squadronRoleIndex]?.roles.push(role.roleName);
  }

  removeRole(squadronId: string, role: UserRolesViewModel) {
    let squadronRole = this.userRoles.find(item => item.squadronId == squadronId);
    let squadronRoleIndex = this.userRoles.indexOf(squadronRole);
    this.userRoles[squadronRoleIndex].roles = this.userRoles[squadronRoleIndex].roles.filter(item => item != role.roleName);
  }

  submit() {
    this.initUserRoles();
    if (this.userRoles.length == 1) {
      this.store.dispatch(PersonnelDetailsActions.setRoles({ roles: this.userRoles[0] }));
    } else {
      this.setAllRoles();
    }
    this.userRoles = null;
  }

  private initUserRoles(): void {
    if (!this.userRoles) {
      this.userRoles = [];
      this.currentPersonnel.userRolesForSquadron?.forEach(squadronRole => {
        if (this.hasAuthorityInSquadron(squadronRole.squadronId)) {
          this.addRolesToList(squadronRole);
        }
      });
    }
  }

  private setAllRoles(): void {
    var allRoles = { roles: this.userRoles }
    this.store.dispatch(PersonnelDetailsActions.setAllRoles({ roles: allRoles }));
  }

  private addRolesToList(squadronRole: UserRolesForSquadronViewModel): void {
    var roles = [];
    squadronRole?.userRoles?.forEach(role => {
      if (role?.isSet) {
        roles.push(role.roleName)
      }
    })
    this.userRoles?.push({
      userId: this.currentPersonnel?.userID,
      squadronId: squadronRole?.squadronId,
      roles: roles
    });
  }

  private selectLoggedUser(): Subscription {
    return this.store.select(AuthSelectors.selectUser).subscribe(user => {
      this.subscription.add(this.selectLoggedUserById(user?.userId));
      this.setIsMainAdmin(user);
    });
  }

  private selectLoggedUserById(personnelId: string): Subscription {
    return this.store.select(PersonnelSelectors.getPersonnelById(), { id: personnelId })
      .subscribe(personnel => {
        this.adminInSquadrons = [];
        personnel?.userRolesForSquadron.forEach(squadronRole => {
          if (this.isAdminInSquadron(squadronRole.userRoles)) {
            this.adminInSquadrons.push(squadronRole.squadronId);
          }
        })
      });
  }

  private setIsMainAdmin(user): void {
    if (user?.decodedToken?.role.indexOf("SuperAdmin") > -1) {
      this.isMainAdmin = true;
    }
  }

  private isAdminInSquadron(userRoles: UserRolesViewModel[]): boolean {
    var bool = false;

    userRoles?.forEach(role => {
      if (role?.roleName == "Admin" && role?.isSet) {
        bool = true;
      }
    });

    return bool;
  }

  setMainAdminCheckboxValue(checked: boolean): void {
    this.mainAdminCheckbox = checked;
  }

  updateMainAdmin(): void {
    this.store.dispatch(PersonnelListActions.setMainAdminRole({ mainAdmin: { userId: this.currentPersonnel.userID, isSet: this.mainAdminCheckbox } }));
    this.checkIfAdmin();
    this.userRoles = null;
  }

  checkIfAdmin(): void {
    if (this.mainAdminCheckbox != this.currentPersonnel?.isMainAdmin) {
      this.isAdminChecked = this.mainAdminCheckbox;
    }
  }

  private getRoles(): void {
    this.store.dispatch(PersonnelListActions.getAllRoles());
  }

  private setRoles(): void {
    this.roleNames = this.store.select(PersonnelSelectors.selectRolesListWithoutMainAdmin);
  }

  ngOnInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? null : this.getRoles();
    this.isAdminChecked = this.currentPersonnel?.isMainAdmin;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private fb: FormBuilder, private authGuard: AuthGuard, private store: Store<State>) {
    this.subscription.add(this.selectLoggedUser());
    this.setRoles();
  }

  ngOnChanges(): void {
    this.sortedRoles = this.currentPersonnel?.userRolesForSquadron?.slice().sort((a, b) => a.squadronName.toLowerCase().localeCompare(b.squadronName.toLowerCase()));
  }
}
