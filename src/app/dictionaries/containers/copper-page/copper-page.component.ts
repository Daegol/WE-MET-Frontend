import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CopperPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { CopperSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-copper-page',
  templateUrl: './copper-page.component.html',
  styleUrls: ['./copper-page.component.scss']
})
export class CopperPageComponent implements OnInit {
  coppers$: Observable<SubCategoryDto[]>;
  selectedCoppers$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.coppers$ = this.store.select(CopperSelectors.selectCoppers);
    this.selectedCoppers$ = this.store.select(CopperSelectors.selectSelectedCoppers);
    this.selectedRow$ = this.store.select(CopperSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(CopperPageActions.getAll());
  }

  onSelectedCoppers(selectedCopper: SubCategoryDto[]) {
    this.store.dispatch(CopperPageActions.setSelectedCoppers({ coppers: selectedCopper }));
  }

  openNewCopperPopup() {
    this.store.dispatch(CopperPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/copper/' + id])
  }

  openDeleteCopperPopup(coppers: SubCategoryDto[]) {
    this.store.dispatch(CopperPageActions.deleteConfirmation({ coppers: coppers }));
  }

  clearSelection(): void {
    this.store.dispatch(CopperPageActions.setSelectedCoppers({ coppers: [] }));
  }

  openEditCopperPopup(copper: SubCategoryDto) {
    this.store.dispatch(CopperPageActions.openEditDialog({ copper: copper }));
  }
  onRowSelectedEvent(copper) {
    this.store.dispatch(CopperPageActions.setSelectedCopper({ copper }));
  }
}
