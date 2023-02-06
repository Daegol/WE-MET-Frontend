import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PurchaseDto, SquadronViewModel } from '@we-met-app/api/models';
import { PurchasesParams } from '@we-met-app/root-store/purchase-manage-store/reducers/purchases.reducer';


@Component({
    selector: 'app-purchases-filter',
    templateUrl: './purchases-filter.component.html',
    styleUrls: ['./purchases-filter.component.scss',
        '../../../../styles/global/filter.scss']
})
export class PurchasesFilterComponent implements OnInit, OnChanges {

    @Input() squadronsNames: SquadronViewModel[];
    @Input() statusesNames: PurchaseDto[];
    @Input() purchasesParamsData: PurchasesParams;
    @Input() selectedPurchases: PurchaseDto[];

    @Output() globalFilterEvent = new EventEmitter<string>();
    @Output() squadronsFilterEvent = new EventEmitter<string[]>();
    @Output() statusesFilterEvent = new EventEmitter<string[]>();

    filterParams = this.fb.group({
        global: "",
        selectedSquadrons: [],
        selectedStatuses: []
    });

    constructor(private fb: FormBuilder) { }

    ngOnChanges(): void {
        this.selectedPurchases.length > 0 ? this.filterParams.disable() : this.filterParams.enable();
    }

    ngOnInit(): void {
        this.setInitialValues();
    }

    ngAfterViewInit(): void {
        this.squadronsFilterAfterInit(this.filterParams.value.selectedSquadrons);
        this.statusesFilterAfterInit(this.filterParams.value.selectedStatuses);
    }

    private squadronsFilterAfterInit(value): void {
        this.squadronsFilterEvent.emit(value);
    }

    private statusesFilterAfterInit(value): void {
        this.statusesFilterEvent.emit(value);
    }

    private setInitialValues(): void {
        if (this.purchasesParamsData !== undefined) {
            this.filterParams.setValue({
                global: "",
                selectedSquadrons: this.purchasesParamsData.currentSquadronIds,
                selectedStatuses: this.purchasesParamsData.currentStatusIds
            });
        }
    }

    private clearFilters() {
        this.filterParams.setValue({
            global: "",
            selectedSquadrons: [],
            selectedStatuses: []
        });
    }

    onGlobalFilterChanged(value: string): void {
        value == "" ? this.globalFilterEvent.emit("EMPTY") : this.globalFilterEvent.emit(value);
    }

    onSquadronsFilterChanged(event): void {
        this.squadronsFilterEvent.emit(event?.value);
    }

    onStatusesFilterChanged(event): void {
        this.statusesFilterEvent.emit(event?.value);
    }

    onClearFilters(): void {
        this.clearFilters();
        this.squadronsFilterEvent.emit([]);
        this.statusesFilterEvent.emit([]);
        this.globalFilterEvent.emit("EMPTY");
    }
}
