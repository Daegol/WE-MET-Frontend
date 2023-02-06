import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersonnelViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { State } from '@we-met-app/root-store/root-state';
import { PersonnelListActions } from '@we-met-app/administration/actions';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-personnel-lookup',
  templateUrl: './personnel-lookup.component.html',
  styleUrls: ['./personnel-lookup.component.scss',
    '../../../../styles/global/lookup.scss'],

})
export class PersonnelLookupComponent implements OnChanges, OnDestroy {
  @Input() row: PersonnelViewModel;
  squadron: SquadronViewModel;
  private subscription = new Subscription();

  constructor(private store: Store<State>,) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
  }

  close(): void {
    this.store.dispatch(PersonnelListActions.setSelectedPersonnel(null));
  }
}
