import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OtherPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { otherCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-other',
  templateUrl: './new-other.component.html',
  styleUrls: ['./new-other.component.scss']
})
export class NewOtherComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newOther.disable();
    } else {
      this.newOther.enable();
    }
  }

  newOther = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: otherCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newOther?.valid) {
      this.store.dispatch(OtherPageActions.createNew({ other: this.newOther?.value }))
    }
  }

  cancel() {
    this.newOther.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(OtherPageActions.closeNewDialog());
  }
}
