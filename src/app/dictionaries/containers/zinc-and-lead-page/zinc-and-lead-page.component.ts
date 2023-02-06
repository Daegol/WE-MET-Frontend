import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ZincAndLeadPageActions } from '@we-met-app/dictionaries/actions';
import { SubCategoryDto } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { ZincAndLeadSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-zinc-and-lead-page',
  templateUrl: './zinc-and-lead-page.component.html',
  styleUrls: ['./zinc-and-lead-page.component.scss']
})
export class ZincAndLeadPageComponent implements OnInit {
  zincAndLeads$: Observable<SubCategoryDto[]>;
  selectedZincAndLeads$: Observable<SubCategoryDto[]>;
  globalFilterValue: string = "";
  selectedRow$: Observable<SubCategoryDto>;

  constructor(private store: Store<State>, private router: Router) {
    this.zincAndLeads$ = this.store.select(ZincAndLeadSelectors.selectZincAndLeads);
    this.selectedZincAndLeads$ = this.store.select(ZincAndLeadSelectors.selectSelectedZincAndLeads);
    this.selectedRow$ = this.store.select(ZincAndLeadSelectors.selectRow);
  }

  onGlobalFilterEvent(filterValue: string) {
    this.globalFilterValue = filterValue;
  }

  ngOnInit(): void {
    this.store.dispatch(ZincAndLeadPageActions.getAll());
  }

  onSelectedZincAndLeads(selectedZincAndLead: SubCategoryDto[]) {
    this.store.dispatch(ZincAndLeadPageActions.setSelectedZincAndLeads({ zincAndLeads: selectedZincAndLead }));
  }

  openNewZincAndLeadPopup() {
    this.store.dispatch(ZincAndLeadPageActions.openNewDialog());
  }

  redirectToEditPage(id: string) {
    this.router.navigate(['/administration/dictionaries/zinc-and-lead/' + id])
  }

  openDeleteZincAndLeadPopup(zincAndLeads: SubCategoryDto[]) {
    this.store.dispatch(ZincAndLeadPageActions.deleteConfirmation({ zincAndLeads: zincAndLeads }));
  }

  clearSelection(): void {
    this.store.dispatch(ZincAndLeadPageActions.setSelectedZincAndLeads({ zincAndLeads: [] }));
  }

  openEditZincAndLeadPopup(zincAndLead: SubCategoryDto) {
    this.store.dispatch(ZincAndLeadPageActions.openEditDialog({ zincAndLead: zincAndLead }));
  }
  onRowSelectedEvent(zincAndLead) {
    this.store.dispatch(ZincAndLeadPageActions.setSelectedZincAndLead({ zincAndLead }));
  }
}
