import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseDto, SquadronViewModel } from '@we-met-app/api/models';
import { Observable } from 'rxjs';
import { PurchasesPageActions } from '@we-met-app/purchase/actions';
import { State } from '@we-met-app/root-store/root-state';

@Component({
    selector: 'app-purchases-lookup',
    templateUrl: './purchases-lookup.component.html',
    styleUrls: ['./purchases-lookup.component.scss',
        '../../../../styles/global/lookup.scss'],
})
export class PurchasesLookupComponent implements OnChanges {
    @Input() row: PurchaseDto;

    purchaseType$: Observable<PurchaseDto>;
    squadron$: Observable<SquadronViewModel>;

    private getPurchaseTypes(): void {
        // this.store.dispatch(PurchaseTypesPageActions.getAll());
    }

    // private setPurchaseType$(): void {
    //     this.purchaseType$ = this.store.select(PurchaseTypesSelectors.getPurchaseTypeById(), { id: this.row?.purchaseTypeId });
    // }

    // private setSquadron$(): void {
    //     this.squadron$ = this.store.select(SquadronSelectors.getSquadronById(), { id: this.row?.squadronId });
    // }

    constructor(private store: Store<State>) {
        this.getPurchaseTypes();
    }

    ngOnChanges(): void {
        // this.setPurchaseType$();
        // this.setSquadron$();
    }

    close(): void {
        this.store.dispatch(PurchasesPageActions.setSelectedPurchase(null));
    }
}