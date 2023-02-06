import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { AluminumDetailsActions, AluminumPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { AluminumSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-aluminum-details',
  templateUrl: './aluminum-details.component.html',
  styleUrls: ['./aluminum-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class AluminumDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editAluminum; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editAluminum = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
  });

  currentAluminum$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editAluminum.disable();
    } else {
      this.editAluminum.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentAluminum$ = this.store.select(AluminumSelectors.getAluminumById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(AluminumDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editAluminum.disable() : this.editAluminum.enable();
  }

  submit() {
    if (this.editAluminum?.valid) {
      this.store.dispatch(AluminumDetailsActions.updateOne({ aluminum: this.editAluminum?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editAluminum.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(AluminumPageActions.closeEditDialog());
  }
}
