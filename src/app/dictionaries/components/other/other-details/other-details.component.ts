import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { OtherDetailsActions, OtherPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { OtherSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class OtherDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editOther; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editOther = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
  });

  currentOther$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editOther.disable();
    } else {
      this.editOther.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentOther$ = this.store.select(OtherSelectors.getOtherById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(OtherDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editOther.disable() : this.editOther.enable();
  }

  submit() {
    if (this.editOther?.valid) {
      this.store.dispatch(OtherDetailsActions.updateOne({ other: this.editOther?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editOther.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(OtherPageActions.closeEditDialog());
  }
}
