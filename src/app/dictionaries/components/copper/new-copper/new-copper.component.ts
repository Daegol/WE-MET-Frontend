import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CopperPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { copperCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-copper',
  templateUrl: './new-copper.component.html',
  styleUrls: ['./new-copper.component.scss']
})
export class NewCopperComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newCopper.disable();
    } else {
      this.newCopper.enable();
    }
  }

  newCopper = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: copperCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newCopper?.valid) {
      this.store.dispatch(CopperPageActions.createNew({ copper: this.newCopper?.value }))
    }
  }

  cancel() {
    this.newCopper.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(CopperPageActions.closeNewDialog());
  }
}
