import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubCategoryDto } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { SteelScrapDetailsActions, SteelScrapPageActions } from '@we-met-app/dictionaries/actions';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedRoles } from '@we-met-app/globals/globals';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '@we-met-app/shared/components';
import { take } from 'rxjs/operators';
import { SteelScrapSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-steel-scrap-details',
  templateUrl: './steel-scrap-details.component.html',
  styleUrls: ['./steel-scrap-details.component.scss',
    '../../../../styles/global/details.scss']
})
export class SteelScrapDetailsComponent extends FormCanDeactivate implements AfterViewInit, OnInit, OnDestroy {
  get form(): FormGroup { return this.editSteelScrap; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  editSteelScrap = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(2)]],
  });

  currentSteelScrap$: Observable<SubCategoryDto>;
  selectedRow: SubCategoryDto;
  private subscription = new Subscription();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.editSteelScrap.disable();
    } else {
      this.editSteelScrap.enable();
    }
  }

  constructor(private fb: FormBuilder, private store: Store<State>,
    private authGuard: AuthGuard, @Inject(MAT_DIALOG_DATA) public data: SubCategoryDto, private dialog: MatDialog) {
    super();
    this.selectedRow = data;
    this.currentSteelScrap$ = this.store.select(SteelScrapSelectors.getSteelScrapById(), { id: this.selectedRow?.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(SteelScrapDetailsActions.getOne({ id: this.selectedRow?.id }));
  }

  ngAfterViewInit(): void {
    !this.authGuard.hasPermissions(authorizedRoles) ? this.editSteelScrap.disable() : this.editSteelScrap.enable();
  }

  submit() {
    if (this.editSteelScrap?.valid) {
      this.store.dispatch(SteelScrapDetailsActions.updateOne({ steelScrap: this.editSteelScrap?.value }));
      this.isSubmitted = true;
    }
  }
  cancel() {
    this.editSteelScrap.dirty ? this.subscripeAfterClosed() : this.dispatchCloseEditDialog();
  }

  private subscripeAfterClosed() {
    this.subscription.add(
      this.dialog.open(UnsavedDialogComponent).afterClosed().pipe(take(1)).subscribe(result => result ? this.dispatchCloseEditDialog() : null)
    )
  }

  private dispatchCloseEditDialog(): void {
    this.store.dispatch(SteelScrapPageActions.closeEditDialog());
  }
}
