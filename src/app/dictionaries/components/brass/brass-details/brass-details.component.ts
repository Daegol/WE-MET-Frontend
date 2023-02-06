import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { BrassDetailsActions, BrassPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { BrassSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-brass-details',
  templateUrl: './brass-details.component.html',
  styleUrls: ['./brass-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class BrassDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editBrass; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editBrass = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
  });

  currentBrass$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editBrass.disable();
    } else {
      this.editBrass.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentBrass$ = this.store.select(BrassSelectors.getBrassById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(BrassDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editBrass.disable() : this.editBrass.enable();
  }

  submit() {
    if (this.editBrass?.valid) {
      this.store.dispatch(BrassDetailsActions.updateOne({ brass: this.editBrass?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editBrass.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(BrassPageActions.closeEditDialog());
  }
}
