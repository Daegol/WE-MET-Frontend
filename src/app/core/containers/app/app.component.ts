import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutActions } from '@we-met-app/core/actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '@we-met-app/auth/models';
import { AuthSelectors, LayoutSelectors, LoginSelectors } from '@we-met-app/root-store';
import { AuthActions } from '@we-met-app/auth/actions';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "app.component.html",
  styles: [
    `
      mat-nav-list {
        overflow-x: hidden;
        overflow-y: hidden;
      }
      mat-sidenav {
        display: flex;
        width: 300px;
        background: #002223;
        color: white;
        overflow-x: hidden;
      }
      mat-sidenav-content {
        background-image: url(assets/images/mapa.png);
        min-width: unset !important;
      }
      .navigationWrapper {
        flex-wrap: wrap;
      }      
      .mat-sidenav-closed {
        width:100px;
      }
      .wemet-content {
        
      }
      .mat-list-item {
        color: white;
        padding: 8px 0;
        size: 40px;
      }
      .mat-list-item:hover {        
          color: #019592;
      }
      .mat-list-item.active {
        color: #019592;
      }
      .routeIcon {
        margin-right: 15px;
        width:70px;
        margin-left: 5px;
      }
      .sidenavLogoContainer {
        height: 70px !important;
        font-size: 30px;
      }
    `,
  ],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(270deg)' })),
      state('expanded', style({ transform: 'rotate(90deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  title$: Observable<string>;
  user$: Observable<User>;

  constructor(private store: Store<State>) {
    this.showSidenav$ = this.store.select(LayoutSelectors.selectShowSidenav);
    this.loggedIn$ = this.store.select(LoginSelectors.selectLoggedIn);
    this.title$ = this.store.select(LayoutSelectors.selectTitle);
    this.user$ = this.store.select(AuthSelectors.selectUser);
  }

  toggleSidenav() {
    this.store.dispatch(LayoutActions.toggleSidenav());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

}
