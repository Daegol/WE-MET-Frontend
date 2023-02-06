import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PersonnelViewModel } from '@we-met-app/api/models';
import { PersonnelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';
import { PersonnelDetailsActions, PersonnelListActions } from '@we-met-app/administration/actions';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-set-personnel-password',
  templateUrl: './set-personnel-password.component.html',
  styleUrls: ['./set-personnel-password.component.scss']
})
export class SetPersonnelPasswordComponent implements OnDestroy {
  actionsSelectedPersonnel: PersonnelViewModel;
  currentPersonnel$: Observable<PersonnelViewModel>;
  email: String = "";
  hide = true;
  private subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.selectFormId();
    this.selectPersonnelEmail();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editPassword = this.fb.group({
    id: [null],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.editPassword.disable() : this.editPassword.enable();
  }

  submit(): void {
    this.isFormValid() ? this.dispatchUpdatePassword() : null;
  }

  cancel(): void {
    this.dispatchCloseDialog();
  }

  private isFormValid(): boolean {
    return this.editPassword.valid;
  }

  private selectFormId(): void {
    this.subscription.add(this.store.select(PersonnelSelectors.selectActionsSelectedPersonnel)
      .pipe(take(1))
      .subscribe(val => this.editPassword?.patchValue({ id: val?.id })));
  }

  private selectPersonnelEmail(): void {
    this.subscription.add(this.store.select(PersonnelSelectors.getPersonnelById(), { id: this.editPassword?.value?.id })
      .pipe(take(1))
      .subscribe((val) => this.email = val?.email));
  }

  private dispatchUpdatePassword(): void {
    this.store.dispatch(PersonnelDetailsActions.updateOnePassword({ password: this.editPassword?.value }));
  }

  private dispatchCloseDialog(): void {
    this.store.dispatch(PersonnelListActions.closeSetPasswordDialog());
  }
}
