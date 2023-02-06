import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { ZincAndLeadDetailsActions, ZincAndLeadPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { ZincAndLeadSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-zinc-and-lead-details',
  templateUrl: './zinc-and-lead-details.component.html',
  styleUrls: ['./zinc-and-lead-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class ZincAndLeadDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editZincAndLead; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editZincAndLead = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
  });

  currentZincAndLead$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editZincAndLead.disable();
    } else {
      this.editZincAndLead.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentZincAndLead$ = this.store.select(ZincAndLeadSelectors.getZincAndLeadById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(ZincAndLeadDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editZincAndLead.disable() : this.editZincAndLead.enable();
  }

  submit() {
    if (this.editZincAndLead?.valid) {
      this.store.dispatch(ZincAndLeadDetailsActions.updateOne({ zincAndLead: this.editZincAndLead?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editZincAndLead.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(ZincAndLeadPageActions.closeEditDialog());
  }
}
