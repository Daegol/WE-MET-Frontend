import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GroupPersonnelViewModel, GroupViewModel } from '@we-met-app/api/models';
import { PersonnelListActions } from '@we-met-app/administration/actions';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { PersonnelParams } from '@we-met-app/root-store/administration-store/reducers/personnel.reducer';
import { PersonnelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit, OnDestroy {
  groups: GroupViewModel[];
  selectedGroups: GroupPersonnelViewModel[];
  finalGroupList: GroupViewModel[];
  currentPersonnelId: String;
  squadronId: string;

  private subscription: Subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.addGroup.disable() : this.addGroup.enable();
  }

  addGroup = this.fb.group({
    groupId: [null, Validators.required],
    personnelId: null
  });

  constructor(private fb: FormBuilder,
    private store: Store<State>,
    private dialog: MatDialog) {
    this.selectSquadron();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSquadron(): void {
    this.subscription.add(this.store.select(PersonnelSelectors.selectPersonnelParams).subscribe(
      (personnelParams: PersonnelParams) => {
        this.currentPersonnelId = personnelParams?.currentPersonnelId;
      })
    );

    this.subscription.add(this.store.select(PersonnelSelectors.getPersonnelById(), { id: this.currentPersonnelId })
      .pipe(take(1))
      .subscribe((p) => {
        this.squadronId = p?.squadronID;
      })
    )
  }

  filterGroups(): void {
    this.finalGroupList = this.groups?.slice();
    this.finalGroupList = this.finalGroupList.filter(x => x.id != this.selectedGroups?.find(y => y.groupId == x.id)?.groupId)
  }

  addGroupSubmit(): void {
    this.setPersonnelId();
    if (this.addGroup.valid) {
      this.store.dispatch(PersonnelListActions.addGroup({ groupPersonnel: this.addGroup?.value }));
    }
  }

  cancel(): void {
    this.addGroup.dirty ? this.subscribeAfterClosed() : this.dispatchCloseNewDialog();
  }

  private subscribeAfterClosed() {
    this.subscription.add(
      this.subscription.add(this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null))
    );
  }

  private setPersonnelId() {
    this.subscription.add(this.store.select(PersonnelSelectors.selectPersonnelParams).subscribe(
      (personnelParams: PersonnelParams) => {
        this.addGroup.patchValue({ personnelId: personnelParams?.currentPersonnelId });
      }
    ));
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(PersonnelListActions.closeAddGroupDialog())
  }

}