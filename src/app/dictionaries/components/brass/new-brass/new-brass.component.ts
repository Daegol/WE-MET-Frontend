import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BrassPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { brassCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-brass',
  templateUrl: './new-brass.component.html',
  styleUrls: ['./new-brass.component.scss']
})
export class NewBrassComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newBrass.disable();
    } else {
      this.newBrass.enable();
    }
  }

  newBrass = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: brassCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newBrass?.valid) {
      this.store.dispatch(BrassPageActions.createNew({ brass: this.newBrass?.value }))
    }
  }

  cancel() {
    this.newBrass.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(BrassPageActions.closeNewDialog());
  }
}
