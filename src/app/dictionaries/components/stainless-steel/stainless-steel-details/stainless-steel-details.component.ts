import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { StainlessSteelDetailsActions, StainlessSteelPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { StainlessSteelSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-stainless-steel-details',
  templateUrl: './stainless-steel-details.component.html',
  styleUrls: ['./stainless-steel-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class StainlessSteelDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editStainlessSteel; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editStainlessSteel = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]]
  });

  currentStainlessSteel$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editStainlessSteel.disable();
    } else {
      this.editStainlessSteel.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentStainlessSteel$ = this.store.select(StainlessSteelSelectors.getStainlessSteelById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(StainlessSteelDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editStainlessSteel.disable() : this.editStainlessSteel.enable();
  }

  submit() {
    if (this.editStainlessSteel?.valid) {
      this.store.dispatch(StainlessSteelDetailsActions.updateOne({ stainlessSteel: this.editStainlessSteel?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editStainlessSteel.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(StainlessSteelPageActions.closeEditDialog());
  }
}
