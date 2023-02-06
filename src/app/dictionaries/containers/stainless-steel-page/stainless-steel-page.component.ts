import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StainlessSteelPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { StainlessSteelSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-stainless-steel-page',
  templateUrl: './stainless-steel-page.component.html',
  styleUrls: ['./stainless-steel-page.component.scss']
})
export class StainlessSteelPageComponent implements OnInit {
  stainlessSteels$: Observable<SubCategoryDto[]>;
  selectedStainlessSteels$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.stainlessSteels$ = this.store.select(StainlessSteelSelectors.selectStainlessSteels);
    this.selectedStainlessSteels$ = this.store.select(StainlessSteelSelectors.selectSelectedStainlessSteels);
    this.selectedRow$ = this.store.select(StainlessSteelSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(StainlessSteelPageActions.getAll());
  }

  onSelectedStainlessSteels(selectedStainlessSteel: SubCategoryDto[]) {
    this.store.dispatch(StainlessSteelPageActions.setSelectedStainlessSteels({ stainlessSteels: selectedStainlessSteel }));
  }

  openNewStainlessSteelPopup() {
    this.store.dispatch(StainlessSteelPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/stainless-steel/' + id])
  }

  openDeleteStainlessSteelPopup(stainlessSteels: SubCategoryDto[]) {
    this.store.dispatch(StainlessSteelPageActions.deleteConfirmation({ stainlessSteels: stainlessSteels }));
  }

  clearSelection(): void {
    this.store.dispatch(StainlessSteelPageActions.setSelectedStainlessSteels({ stainlessSteels: [] }));
  }

  openEditStainlessSteelPopup(stainlessSteel: SubCategoryDto) {
    this.store.dispatch(StainlessSteelPageActions.openEditDialog({ stainlessSteel: stainlessSteel }));
  }
  onRowSelectedEvent(stainlessSteel) {
    this.store.dispatch(StainlessSteelPageActions.setSelectedStainlessSteel({ stainlessSteel }));
  }
}
