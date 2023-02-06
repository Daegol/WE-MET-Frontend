import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from '@we-met-app/auth/models';
import { LoginPageActions } from '@we-met-app/auth/actions';
import { LoginSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Component({
  selector: 'bc-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
    </app-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.select(LoginSelectors.selectLoginPagePending);
  error$ = this.store.select(LoginSelectors.selectLoginPageError);

  constructor(private store: Store<State>) {

  }

  ngOnInit() { }

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
