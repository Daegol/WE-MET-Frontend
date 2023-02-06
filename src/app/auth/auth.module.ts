import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from '@we-met-app/auth/containers';
import {
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
} from '@we-met-app/auth/components';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '@we-met-app/material';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule { }
