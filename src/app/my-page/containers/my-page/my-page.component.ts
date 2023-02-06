import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyPageActions } from '@we-met-app/my-page/actions';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from '@we-met-app/auth/models';
import { State } from '@we-met-app/root-store/root-state';
import { AuthSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit, OnDestroy {
  user: User;
  private subscription = new Subscription();

  constructor(private store: Store<State>) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.onSelectUser());
  }

  private onSelectUser(): Subscription {
    return this.store.select(AuthSelectors.selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user;
      });
  }

  openSetMyPagePasswordPopup(): void {
    this.store.dispatch(MyPageActions.openChangePasswordDialog());
  }

  private hasPermissions(requiredRoles: string[]): boolean {
    return requiredRoles?.some(role => this.user?.decodedToken?.roles?.includes(role)) || requiredRoles?.length == 0;
  }

}
