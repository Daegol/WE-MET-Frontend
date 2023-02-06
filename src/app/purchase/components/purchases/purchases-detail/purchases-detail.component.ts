import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PurchaseDto, LocalizationViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PurchasesDetailsActions } from '@we-met-app/purchase/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from '@we-met-app/shared/guards/can-deactivate-guard';
import { AuthGuard } from '@we-met-app/auth/services';
import { authorizedMXRoles } from '@we-met-app/globals/globals';
import { PurchasesSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
    selector: 'app-purchases-detail',
    templateUrl: './purchases-detail.component.html',
    styleUrls: ['./purchases-detail.component.scss',
        '../../../../styles/global/details.scss']
})
export class PurchasesDetailComponent extends FormCanDeactivate implements OnInit, AfterViewInit, OnDestroy {
    get form(): FormGroup { return this.editPurchase; }
    get submitted(): boolean { return this.isSubmitted; }

    private subscription = new Subscription();
    private isSubmitted = false;
    editPurchase = this.fb.group({
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
        description: [null],
        purchaseStatusBackgroundColor: [null],
        purchaseStatusFontColor: [null]
    });

    squadrons$: Observable<SquadronViewModel[]>;
    localizations$: Observable<LocalizationViewModel[]>;
    availableLocalizations: Observable<LocalizationViewModel[]>;
    currentPurchase$: Observable<PurchaseDto>;

    submit(): void {
        if (this.editPurchase.valid) {
            this.store.dispatch(PurchasesDetailsActions.updateOne({ purchase: this.editPurchase.value }));
            this.isSubmitted = true;
        }
    }
    onSquadronSelected($event): void {
        this.editPurchase?.get('localizationId')?.setValue(null);
        this.limitLocalizations($event?.value);
    }

    limitLocalizations(id: string): void {
        this.availableLocalizations = this.localizations$
            .pipe(map(localizations => localizations?.filter(localization => localization?.squadronId === id)));
    }

    cancel(): void {
        this.router.navigateByUrl("maintenance/purchases");
    }

    ngOnInit(): void {
        this.getCurrentPurchase();
    }

    ngAfterViewInit(): void {
        !this.authGuard.hasPermissions(authorizedMXRoles) ? this.editPurchase.disable() : this.editPurchase.enable();
    }

    constructor(private fb: FormBuilder, private store: Store<State>, private router: Router, private route: ActivatedRoute, private authGuard: AuthGuard) {
        super();
        this.setCurrentPurchase$();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getCurrentPurchase(): void {
        this.store.dispatch(PurchasesDetailsActions.getOne({ id: this.route.snapshot.params.id }));
    }



    private setCurrentPurchase$(): void {
        this.currentPurchase$ = this.store.select(PurchasesSelectors.getPurchaseById(), { id: this.route.snapshot.params.id });
    }


}

