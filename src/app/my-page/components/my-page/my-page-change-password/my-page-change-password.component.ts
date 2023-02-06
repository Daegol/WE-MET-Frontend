import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MyPageActions, MyPageProfileActions } from '@we-met-app/my-page/actions';
import { take } from 'rxjs/operators';
import { User } from '@we-met-app/auth/models';
import { MustMatch } from '@we-met-app/shared/helpers/must-match.validator';
import { Subscription } from 'rxjs';
import { State } from '@we-met-app/root-store/root-state';
import { AuthSelectors } from '@we-met-app/root-store';
@Component({
  selector: 'app-my-page-change-password',
  templateUrl: './my-page-change-password.component.html',
  styleUrls: ['./my-page-change-password.component.scss']
})
export class MyPageChangePasswordComponent implements OnInit, OnDestroy {
  hideOld = true;
  hide = true;
  hideNew = true;
  user: User = null;
  private subscription = new Subscription();

  changePassword = this.fb.group({
    oldPassword: [null, Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  },
    {
      validator: MustMatch('password', 'confirmPassword')
    });

  constructor(private fb: FormBuilder, private store: Store<State>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(AuthSelectors.selectUser)
        .pipe(take(1))
        .subscribe((user) => this.user = user));
  }

  submit() {
    if (this.changePassword?.valid) {
      this.store.dispatch(MyPageProfileActions.changeOnePassword({ password: this.changePassword?.value }))
    }
  }

  cancel() {
    this.store.dispatch(MyPageActions.closeChangePasswordDialog());
  }
}
