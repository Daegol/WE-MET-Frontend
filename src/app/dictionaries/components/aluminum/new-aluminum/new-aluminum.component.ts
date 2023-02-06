import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AluminumPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { alumunimumCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-aluminum',
  templateUrl: './new-aluminum.component.html',
  styleUrls: ['./new-aluminum.component.scss']
})
export class NewAluminumComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newAluminum.disable();
    } else {
      this.newAluminum.enable();
    }
  }

  newAluminum = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: alumunimumCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newAluminum?.valid) {
      this.store.dispatch(AluminumPageActions.createNew({ aluminum: this.newAluminum?.value }))
    }
  }

  cancel() {
    this.newAluminum.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(AluminumPageActions.closeNewDialog());
  }
}
