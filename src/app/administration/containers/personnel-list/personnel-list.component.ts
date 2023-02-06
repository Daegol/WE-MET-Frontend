import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { PersonnelViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { PersonnelSelectors } from '@we-met-app/root-store';
import { PersonnelParams } from '@we-met-app/root-store/administration-store/reducers/personnel.reducer';
import { Observable } from 'rxjs';
import { PersonnelListActions } from '../../actions';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.scss',
    '../../../styles/global/page.scss'],
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
export class PersonnelListComponent implements OnInit {
  personnel$: Observable<PersonnelViewModel[]>;
  selectedRow$: Observable<PersonnelViewModel>;
  actionsSelectedPersonnel$: Observable<PersonnelViewModel>;
  selectedPersonnels$: Observable<PersonnelViewModel[]>;
  squadrons$: Observable<SquadronViewModel[]>;

  personnelParams$: Observable<PersonnelParams>;

  globalFilterValue: string = "";
  squadronsFilterValue: string = "";

  constructor(private router: Router, private store: Store<State>,) {
    this.selectPersonnel();
    this.selectActionsSelectedPersonnel();
    this.selectSelectedRow();
    this.selectSelectedPersonnel();
    this.selectPersonnelParams();
  }

  ngOnInit(): void {
    this.store.dispatch(PersonnelListActions.getAll());

    this.setInitialSquadrons();
  }

  private selectPersonnelParams() {
    this.personnelParams$ = this.store.select(PersonnelSelectors.selectPersonnelParams);
  }

  private selectPersonnel(): void {
    this.personnel$ = this.store.select(PersonnelSelectors.selectPersonnel);
  }
  private selectSelectedRow(): void {
    this.selectedRow$ = this.store.select(PersonnelSelectors.selectCurrentPersonnel);
  }
  private selectSelectedPersonnel(): void {
    this.selectedPersonnels$ = this.store.select(PersonnelSelectors.selectSelectedPersonnels)
  }
  private selectActionsSelectedPersonnel(): void {
    this.actionsSelectedPersonnel$ = this.store.select(PersonnelSelectors.selectActionsSelectedPersonnel);
  }

  private setInitialSquadrons() {
    this.store.dispatch(PersonnelListActions.setInitialSquadrons({ ids: [] }));
  }

  onGlobalFilterEvent(filterValue: string): void {
    this.globalFilterValue = filterValue;
    this.store.dispatch(PersonnelListActions.setSelectedPersonnel(null));
  }

  onSquadronsFilterEvent(filterValue): void {
    this.squadronsFilterValue = filterValue;
    this.store.dispatch(PersonnelListActions.setSelectedPersonnel(null));
    this.store.dispatch(PersonnelListActions.setCurrentSquadrons({ ids: filterValue }));
  }

  openNewPersonnelPopup(): void {
    this.store.dispatch(PersonnelListActions.openNewDialog());
  }

  onRowSelectedEvent(personnel: PersonnelViewModel): void {
    this.store.dispatch(PersonnelListActions.setSelectedPersonnel({ personnel }));
  }

  onSelectedPersonnels(selectedPersonnels: PersonnelViewModel[]): void {
    this.store.dispatch(PersonnelListActions.setSelectedPersonnels({ personnels: selectedPersonnels }));
  }

  openDeletePersonnelPopup(personnel: PersonnelViewModel[]): void {
    this.store.dispatch(PersonnelListActions.deleteConfirmation({ personnel: personnel }));
  }

  onActionsPersonnelSelected(actionsPersonnel: PersonnelViewModel): void {
    this.store.dispatch(PersonnelListActions.setActionsSelectedPersonnel({ personnel: actionsPersonnel }));
    this.store.dispatch(PersonnelListActions.setCurrentPersonnelId({ id: actionsPersonnel?.id }));
  }

  redirectToEditPage(id: string): void {
    this.router.navigate(['/administration/personnel/' + id])
  }

  openSetPersonnelPasswordPopup(): void {
    this.store.dispatch(PersonnelListActions.openSetPasswordDialog());
  }

  clearSelection(): void {
    this.store.dispatch(PersonnelListActions.setSelectedPersonnels({ personnels: [] }));
  }
}
