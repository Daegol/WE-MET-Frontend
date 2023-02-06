import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SteelScrapPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { steelScrapCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-steel-scrap',
  templateUrl: './new-steel-scrap.component.html',
  styleUrls: ['./new-steel-scrap.component.scss']
})
export class NewSteelScrapComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newSteelScrap.disable();
    } else {
      this.newSteelScrap.enable();
    }
  }

  newSteelScrap = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: steelScrapCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newSteelScrap?.valid) {
      this.store.dispatch(SteelScrapPageActions.createNew({ steelScrap: this.newSteelScrap?.value }))
    }
  }

  cancel() {
    this.newSteelScrap.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(SteelScrapPageActions.closeNewDialog());
  }
}
