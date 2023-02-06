import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { aluminumRoles, copperRoles, otherRoles, stainlessSteelRoles, steelScrapRoles } from '@we-met-app/globals/globals';
import { Store } from '@ngrx/store';
import { User } from '@we-met-app/auth/models';
import { AuthGuard } from '@we-met-app/auth/services';
import { AuthSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-dictionaries-page',
  templateUrl: './dictionaries-page.component.html',
  styleUrls: ['./dictionaries-page.component.scss']
})
export class DictionariesPageComponent implements OnInit {
  @ViewChildren('card', { read: ElementRef }) childCards: QueryList<ElementRef>;
  user: User;
  filteredCards = [];

  cards = [
    { title: 'Złom stalowy', roles: steelScrapRoles, path: '/steel-scrap', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Aluminium', roles: aluminumRoles, path: '/aluminum', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Stal nierdzewna', roles: stainlessSteelRoles, path: '/stainless-steel', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Miedź', roles: copperRoles, path: '/copper', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Mosiądz', roles: copperRoles, path: '/brass', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Cynk i ołów', roles: copperRoles, path: '/zinc-and-lead', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
    { title: 'Inne', roles: otherRoles, path: '/other', cols: 1, rows: 1, icon: "assets/images/dictionaries-icons/trainingTaskTypes.png" },
  ];

  constructor(private store: Store<State>, private authGuard: AuthGuard) {
    this.store.select(AuthSelectors.selectUser).subscribe((user) => this.user = user);
  }

  ngOnInit() {
    this.filteredCards = this.cards.slice();
    this.filteredCards = this.filteredCards.filter((x) => this.authGuard.hasPermissions(x.roles))
  }
}