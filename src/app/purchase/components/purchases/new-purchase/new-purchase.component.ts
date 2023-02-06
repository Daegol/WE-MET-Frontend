import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PurchasesPageActions } from '@we-met-app/purchase/actions';
import { LocalizationViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
// import { Guid } from 'guid-typescript';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { State } from '@we-met-app/root-store/root-state';


@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss',
    '../../../../styles/global/new-items.scss']
})
export class NewPurchaseComponent extends FormCanDeactivate implements OnDestroy {
  get form(): FormGroup { return this.newPurchase; }
  get submitted(): boolean { return this.isSubmitted; }

  private isSubmitted = false;
  private subscription = new Subscription();

  newPurchase = this.fb.group({
    id: [null],
    squadronId: [null, Validators.required],
    squadonName: [null],
    purchaseTypeId: [null, Validators.required],
    purchaseTypeName: [null],
    tailNumber: [null, [Validators.required, Validators.minLength(2)]],
    localizationId: [null, Validators.required],
    localizationName: [null],
    purchaseStatusId: [null, Validators.required],
    purchaseStatusName: [null],
    description: [null]
  });

  squadrons$: Observable<SquadronViewModel[]>;
  localizations$: Observable<LocalizationViewModel[]>;
  availableLocalizations: Observable<LocalizationViewModel[]>;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newPurchase.disable();
    } else {
      this.newPurchase.enable();
    }
  }

  submit() {
    this.setId();
    if (this.newPurchase.valid) {
      this.store.dispatch(PurchasesPageActions.createNew({ purchase: this.newPurchase.value }));
      this.isSubmitted = true;
    }
  }

  private setId(): void {
    // this.newPurchase.patchValue({ id: Guid.create().toString() });
  }

  cancel(): void {
    this.router.navigateByUrl("maintenance/purchases");
  }

  onSquadronSelected($event): void {
    this.limitLocalizations($event.value);
  }

  private limitLocalizations(id: string): void {
    this.availableLocalizations = this.localizations$.pipe(map(localizations => localizations.filter(localization => localization.squadronId === id)));
  }

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private router: Router,
    private store: Store<State>) {
    super();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
