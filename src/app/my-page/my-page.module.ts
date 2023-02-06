import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@we-met-app/material';
import { MyPageRoutingModule } from './my-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@we-met-app/shared';
import { MyPageComponent } from './containers';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@we-met-app/auth';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MyPageChangePasswordComponent, MyPageProfileComponent } from './components';

export const COMPONENTS = [
  MyPageProfileComponent,
  MyPageChangePasswordComponent
];

export const CONTAINERS = [
  MyPageComponent
];

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    MyPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class MyPageModule { }
