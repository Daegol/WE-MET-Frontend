import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StainlessSteelPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { stainlessSteelCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-stainless-steel',
  templateUrl: './new-stainless-steel.component.html',
  styleUrls: ['./new-stainless-steel.component.scss']
})
export class NewStainlessSteelComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newStainlessSteel.disable();
    } else {
      this.newStainlessSteel.enable();
    }
  }

  newStainlessSteel = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: stainlessSteelCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newStainlessSteel?.valid) {
      this.store.dispatch(StainlessSteelPageActions.createNew({ stainlessSteel: this.newStainlessSteel?.value }))
    }
  }

  cancel() {
    this.newStainlessSteel.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(StainlessSteelPageActions.closeNewDialog());
  }
}
