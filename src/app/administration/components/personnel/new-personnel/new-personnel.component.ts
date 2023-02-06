import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RankViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { PersonnelListActions } from '@we-met-app/administration/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { MustMatch } from '@we-met-app/shared/helpers/must-match.validator';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-new-personnel',
  templateUrl: './new-personnel.component.html',
  styleUrls: ['./new-personnel.component.scss']
})
export class NewPersonnelComponent implements OnDestroy {
  hide = true;

  newPersonnel = this.fb.group({
    rankID: null,
    firstName: [null, [Validators.required, Validators.minLength(2)]],
    lastName: [null, [Validators.required, Validators.minLength(2)]],
    callsign: [null, [Validators.required, Validators.minLength(2)]],
    email: [null, [Validators.required, Validators.email]],
    squadronID: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
  },
    {
      validator: MustMatch('password', 'confirmPassword')
    });

  squadrons$: Observable<SquadronViewModel[]>;
  ranks$: Observable<RankViewModel[]>;

  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.newPersonnel.disable() : this.newPersonnel.enable();
  }

  submit(): void {
    if (this.isFormValid()) {
      this.dispatchCreateNewPersonnel();
    }
  }

  cancel(): void {
    this.newPersonnel.dirty ? this.subscribeAfterClosed() : this.dispatchCloseNewDialog();
  }

  private subscribeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private isFormValid(): boolean {
    return this.newPersonnel.valid;
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(PersonnelListActions.closeNewDialog())
  }

  private dispatchCreateNewPersonnel(): void {
    this.store.dispatch(PersonnelListActions.createNew({ personnel: this.newPersonnel?.value }));
  }



  constructor(private fb: FormBuilder,
    private store: Store<State>,
    private dialog: MatDialog) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
