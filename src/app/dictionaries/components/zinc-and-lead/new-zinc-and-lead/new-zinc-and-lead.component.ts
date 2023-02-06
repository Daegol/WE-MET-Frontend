import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ZincAndLeadPageActions } from '@we-met-app/dictionaries/actions';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '@we-met-app/root-store/root-state';
import { zincAndLeadCategoryId } from '@we-met-app/globals/globals';
@Component({
  selector: 'app-new-zinc-and-lead',
  templateUrl: './new-zinc-and-lead.component.html',
  styleUrls: ['./new-zinc-and-lead.component.scss']
})
export class NewZincAndLeadComponent implements OnDestroy {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newZincAndLead.disable();
    } else {
      this.newZincAndLead.enable();
    }
  }

  newZincAndLead = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    mainCategoryId: zincAndLeadCategoryId.toString()
  });

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.newZincAndLead?.valid) {
      this.store.dispatch(ZincAndLeadPageActions.createNew({ zincAndLead: this.newZincAndLead?.value }))
    }
  }

  cancel() {
    this.newZincAndLead.dirty
      ? this.subscripeAfterClosed()
      : this.dispatchCloseNewDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseNewDialog() : null)
    )
  }

  private dispatchCloseNewDialog(): void {
    this.store.dispatch(ZincAndLeadPageActions.closeNewDialog());
  }
}
