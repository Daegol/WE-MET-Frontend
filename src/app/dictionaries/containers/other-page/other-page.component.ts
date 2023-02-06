import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OtherPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { OtherSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.scss']
})
export class OtherPageComponent implements OnInit {
  others$: Observable<SubCategoryDto[]>;
  selectedOthers$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.others$ = this.store.select(OtherSelectors.selectOthers);
    this.selectedOthers$ = this.store.select(OtherSelectors.selectSelectedOthers);
    this.selectedRow$ = this.store.select(OtherSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(OtherPageActions.getAll());
  }

  onSelectedOthers(selectedOther: SubCategoryDto[]) {
    this.store.dispatch(OtherPageActions.setSelectedOthers({ others: selectedOther }));
  }

  openNewOtherPopup() {
    this.store.dispatch(OtherPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/other/' + id])
  }

  openDeleteOtherPopup(others: SubCategoryDto[]) {
    this.store.dispatch(OtherPageActions.deleteConfirmation({ others: others }));
  }

  clearSelection(): void {
    this.store.dispatch(OtherPageActions.setSelectedOthers({ others: [] }));
  }

  openEditOtherPopup(other: SubCategoryDto) {
    this.store.dispatch(OtherPageActions.openEditDialog({ other: other }));
  }
  onRowSelectedEvent(other) {
    this.store.dispatch(OtherPageActions.setSelectedOther({ other }));
  }
}
