import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SteelScrapPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { SteelScrapSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-steel-scrap-page',
  templateUrl: './steel-scrap-page.component.html',
  styleUrls: ['./steel-scrap-page.component.scss']
})
export class SteelScrapPageComponent implements OnInit {
  steelScraps$: Observable<SubCategoryDto[]>;
  selectedSteelScraps$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.steelScraps$ = this.store.select(SteelScrapSelectors.selectSteelScraps);
    this.selectedSteelScraps$ = this.store.select(SteelScrapSelectors.selectSelectedSteelScraps);
    this.selectedRow$ = this.store.select(SteelScrapSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(SteelScrapPageActions.getAll());
  }

  onSelectedSteelScraps(selectedSteelScrap: SubCategoryDto[]) {
    this.store.dispatch(SteelScrapPageActions.setSelectedSteelScraps({ steelScraps: selectedSteelScrap }));
  }

  openNewSteelScrapPopup() {
    this.store.dispatch(SteelScrapPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/steel-scrap/' + id])
  }

  openDeleteSteelScrapPopup(steelScraps: SubCategoryDto[]) {
    this.store.dispatch(SteelScrapPageActions.deleteConfirmation({ steelScraps: steelScraps }));
  }

  clearSelection(): void {
    this.store.dispatch(SteelScrapPageActions.setSelectedSteelScraps({ steelScraps: [] }));
  }

  openEditSteelScrapPopup(steelScrap: SubCategoryDto) {
    this.store.dispatch(SteelScrapPageActions.openEditDialog({ steelScrap: steelScrap }));
  }
  onRowSelectedEvent(steelScrap) {
    this.store.dispatch(SteelScrapPageActions.setSelectedSteelScrap({ steelScrap }));
  }
}
