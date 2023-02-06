import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrassPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { BrassSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-brass-page',
  templateUrl: './brass-page.component.html',
  styleUrls: ['./brass-page.component.scss']
})
export class BrassPageComponent implements OnInit {
  brasss$: Observable<SubCategoryDto[]>;
  selectedBrasss$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.brasss$ = this.store.select(BrassSelectors.selectBrasss);
    this.selectedBrasss$ = this.store.select(BrassSelectors.selectSelectedBrasss);
    this.selectedRow$ = this.store.select(BrassSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(BrassPageActions.getAll());
  }

  onSelectedBrasss(selectedBrass: SubCategoryDto[]) {
    this.store.dispatch(BrassPageActions.setSelectedBrasss({ brasss: selectedBrass }));
  }

  openNewBrassPopup() {
    this.store.dispatch(BrassPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/brass/' + id])
  }

  openDeleteBrassPopup(brasss: SubCategoryDto[]) {
    this.store.dispatch(BrassPageActions.deleteConfirmation({ brasss: brasss }));
  }

  clearSelection(): void {
    this.store.dispatch(BrassPageActions.setSelectedBrasss({ brasss: [] }));
  }

  openEditBrassPopup(brass: SubCategoryDto) {
    this.store.dispatch(BrassPageActions.openEditDialog({ brass: brass }));
  }
  onRowSelectedEvent(brass) {
    this.store.dispatch(BrassPageActions.setSelectedBrass({ brass }));
  }
}
