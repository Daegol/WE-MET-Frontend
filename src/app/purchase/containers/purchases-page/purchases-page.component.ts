import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseDto, SquadronViewModel } from '@we-met-app/api/models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PurchasesPageActions } from '@we-met-app/purchase/actions';
import { animate, style, transition, trigger } from '@angular/animations';
import { PurchasesSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';
import { PurchasesParams } from '@we-met-app/root-store/purchase-manage-store/reducers/purchases.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-purchases-page',
  templateUrl: './purchases-page.component.html',
  styleUrls: ['./purchases-page.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [transition(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.2s ease-out',
            style({ transform: 'translateX(0)' }))
        ]
      ),
      transition(':leave',
        [
          style({ transform: 'translateX(0)' }),
          animate('0.2s ease-in',
            style({ transform: 'translateX(-100%)' }))
        ])]
    )
  ]
})
export class PurchasesPageComponent implements OnInit {
  purchases$: Observable<PurchaseDto[]>;
  selectedRow$: Observable<PurchaseDto>;
  selectedPurchases$: Observable<PurchaseDto[]>;

  statusesNames$: Observable<PurchaseDto[]>;

  squadrons$: Observable<SquadronViewModel[]>;

  purchasesParams$: Observable<PurchasesParams>;

  globalFilterValue: string = "";
  squadronsFilterValue: string = "";
  statusesFilterValue: string = "";

  constructor(private router: Router, private store: Store<State>) {
    this.purchases$ = this.store.select(PurchasesSelectors.selectPurchases);
    this.selectedRow$ = this.store.select(PurchasesSelectors.selectRow);
    this.selectedPurchases$ = this.store.select(PurchasesSelectors.selectSelectedPurchases);
    this.purchasesParams$ = this.store.select(PurchasesSelectors.selectPurchasesParams);
  }

  ngOnInit(): void {
    this.store.dispatch(PurchasesPageActions.getAll());

    this.store.dispatch(PurchasesPageActions.setInitialSquadrons({ ids: [] }))
    this.store.dispatch(PurchasesPageActions.setInitialStatuses({ ids: [] }))
  }

  openNewPurchasePopup() {
    this.store.dispatch(PurchasesPageActions.openNewDialog());
  }

  deleteSelectedItems(purchases: PurchaseDto[]) {
    this.store.dispatch(PurchasesPageActions.removeMany({ purchases }));
  }

  onRowSelectedEvent(purchase: PurchaseDto) {
    this.store.dispatch(PurchasesPageActions.setSelectedPurchase({ purchase }));
  }

  onSelectedPurchases(selectedPurchases: PurchaseDto[]) {
    this.store.dispatch(PurchasesPageActions.setSelectedPurchases({ purchases: selectedPurchases }));
  }

  openDeletePurchasePopup(purchases: PurchaseDto[]) {
    this.store.dispatch(PurchasesPageActions.deleteConfirmation({ purchases }));
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
    this.store.dispatch(PurchasesPageActions.setSelectedPurchase(null));
  }

  onSquadronsFilterEvent(filterValue) {
    this.squadronsFilterValue = filterValue;
    this.store.dispatch(PurchasesPageActions.setSelectedPurchase(null));
    this.store.dispatch(PurchasesPageActions.setCurrentSquadrons({ ids: filterValue }));
  }

  onStatusesFilterEvent(filterValue) {
    this.statusesFilterValue = filterValue;
    this.store.dispatch(PurchasesPageActions.setSelectedPurchase(null));
    this.store.dispatch(PurchasesPageActions.setCurrentStatuses({ ids: filterValue }));
  }

  clearSelection(): void {
    this.store.dispatch(PurchasesPageActions.setSelectedPurchases({ purchases: [] }));
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/maintenance/purchases/' + id]);
  }

  redirectToAddPage() {
    this.router.navigate(['/maintenance/purchases-add']);
  }

}
