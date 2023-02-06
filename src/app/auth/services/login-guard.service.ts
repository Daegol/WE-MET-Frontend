import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '@we-met-app/root-store/root-state';
import { LoginSelectors } from '@we-met-app/root-store';
import { AuthApiActions } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<State>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(LoginSelectors.selectLoggedIn).pipe(
      take(1),
      map((authed) => {
        if (authed) {
          this.store.dispatch(AuthApiActions.authRedirect());
          return false;
        }

        return true;
      })
    );
  }
}
