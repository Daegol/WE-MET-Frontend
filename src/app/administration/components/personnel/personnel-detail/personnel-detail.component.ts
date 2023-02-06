import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PersonnelViewModel, RankViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonnelDetailsActions, PersonnelListActions } from '@we-met-app/administration/actions';
import { Location } from '@angular/common'
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { authorizedRoles, administrationPersonnelRoles } from '@we-met-app/globals/globals';
import { AuthGuard } from '@we-met-app/auth/services';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';
import { PersonnelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-personnel-detail',
  templateUrl: './personnel-detail.component.html',
  styleUrls: ['./personnel-detail.component.scss',
    '../../../../styles/global/details.scss']
})
export class PersonnelDetailComponent extends FormCanDeactivate implements OnInit, OnDestroy, AfterViewInit {
  get form(): FormGroup { return this.editPersonnel; }
  get submitted(): boolean { return this.isSubmitted; }
  private isSubmitted = false;

  editPersonnel = this.fb.group({
    id: [null],
    firstName: [null, [Validators.required, Validators.minLength(2)]],
    lastName: [null, [Validators.required, Validators.minLength(2)]],
    squadronID: [null, Validators.required],
    squadronName: [null],
    callsign: [null, [Validators.required, Validators.minLength(2)]],
    rankID: [null, [Validators.required]],
    rankName: [null],
    rankShortname: [null],
    isPersonnel: [null, [Validators.required]],
    userID: [null],
    isLocked: [null, [Validators.required]],
  });

  squadrons$: Observable<SquadronViewModel[]>;
  ranks$: Observable<RankViewModel[]>;
  currentPersonnel$: Observable<PersonnelViewModel>;
  selectedGroups$: Observable<GroupPersonnelViewModel[]>;
  firstName: string = "";
  lastName: string = "";
  administrationPersonnelRoles = administrationPersonnelRoles;

  private subscription = new Subscription();
  private id = this.route.snapshot.params.id;

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.editPersonnel.disable() : this.editPersonnel.enable();
  }

  constructor(private authGuard: AuthGuard,
    private fb: FormBuilder,
    private store: Store<State>,
    private route: ActivatedRoute,
    private location: Location) {
    super();
    this.selectCurrentPersonnel();
    this.selectSelectedGroups();
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editPersonnel.disable() : this.editPersonnel.enable();
  }

  ngOnInit(): void {
    this.dispatchOnePersonnel();
    this.dispatchClearSelection();
    this.getFirstLastName();
    this.dispatchSetCurrentPersonnelId();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    if (this.editPersonnel.valid) {
      this.dispatchUpdatePersonnel();
      this.isSubmitted = true;
      this.location.back();
    }
  }

  openAddGroupPopup(): void {
    this.store.dispatch(PersonnelListActions.openAddGroupDialog());
  }

  openDeleteGroupPopup(groupsPersonnel: GroupPersonnelViewModel[]): void {
    this.store.dispatch(PersonnelListActions.deleteGroupConfirmation({ groupsPersonnel: groupsPersonnel }));
  }

  private getFirstLastName(): void {
    this.subscription.add(
      this.currentPersonnel$.subscribe((personnel) => {
        this.firstName = personnel?.firstName;
        this.lastName = personnel?.lastName;
      }));
  }

  private dispatchOnePersonnel(): void {
    this.store.dispatch(PersonnelDetailsActions.getOne({ id: this.id }));
  }


  private dispatchClearSelection(): void {
    this.store.dispatch(PersonnelListActions.setSelectedGroups({ groups: [] }));
  }

  private dispatchUpdatePersonnel(): void {
    this.store.dispatch(PersonnelDetailsActions.updateOne({ personnel: this.editPersonnel?.value }));
  }

  private selectCurrentPersonnel(): void {
    this.currentPersonnel$ = this.store.select(PersonnelSelectors.getPersonnelById(), { id: this.id });
  }

  private selectSelectedGroups(): void {
    this.selectedGroups$ = this.store.select(PersonnelSelectors.selectSelectedGroups);
  }

  private dispatchSetCurrentPersonnelId(): void {
    this.store.dispatch(PersonnelListActions.setCurrentPersonnelId({ id: this.id }));
  }
}
