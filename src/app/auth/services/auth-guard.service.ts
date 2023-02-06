import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthActions } from '@we-met-app/auth/actions';
import { State } from '@we-met-app/root-store/root-state';
import { AuthSelectors } from '@we-met-app/root-store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>) { }

  user: any;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(AuthSelectors.selectUser).pipe(
      take(1),
      map((user) => {
        this.user = user;
        let authed = !!user;

        if (!authed || this.isTokenExpired(user.decodedToken.exp)) {
          this.store.dispatch(AuthActions.logout());
          return false;
        }
        if (route.data.roles) {
          return this.hasPermissions(route.data.roles);
        }
        return true;
      }),
    );
  }

  hasPermissions(requiredRoles: string[]): boolean {
    if (!this.user) {
      this.setUser();
    }
    return requiredRoles?.every(roles => this.user?.decodedToken?.roles?.includes(roles)) || requiredRoles.length == 0;
  }

  setUser() {
    this.store.select(AuthSelectors.selectUser).pipe(
      take(1),
      map((user) => {
        this.user = user;
      }));
  }

  private isTokenExpired(expirationTime) {
    if (expirationTime !== null) {
      return Date.now() >= expirationTime * 1000 ? true : false;
    } else {
      return true;
    }
  }
}
