import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AluminumPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { AluminumSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-aluminum-page',
  templateUrl: './aluminum-page.component.html',
  styleUrls: ['./aluminum-page.component.scss']
})
export class AluminumPageComponent implements OnInit {
  aluminums$: Observable<SubCategoryDto[]>;
  selectedAluminums$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.aluminums$ = this.store.select(AluminumSelectors.selectAluminums);
    this.selectedAluminums$ = this.store.select(AluminumSelectors.selectSelectedAluminums);
    this.selectedRow$ = this.store.select(AluminumSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(AluminumPageActions.getAll());
  }

  onSelectedAluminums(selectedAluminum: SubCategoryDto[]) {
    this.store.dispatch(AluminumPageActions.setSelectedAluminums({ aluminums: selectedAluminum }));
  }

  openNewAluminumPopup() {
    this.store.dispatch(AluminumPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/aluminum/' + id])
  }

  openDeleteAluminumPopup(aluminums: SubCategoryDto[]) {
    this.store.dispatch(AluminumPageActions.deleteConfirmation({ aluminums: aluminums }));
  }

  clearSelection(): void {
    this.store.dispatch(AluminumPageActions.setSelectedAluminums({ aluminums: [] }));
  }

  openEditAluminumPopup(aluminum: SubCategoryDto) {
    this.store.dispatch(AluminumPageActions.openEditDialog({ aluminum: aluminum }));
  }
  onRowSelectedEvent(aluminum) {
    this.store.dispatch(AluminumPageActions.setSelectedAluminum({ aluminum }));
  }
}
