import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '@we-met-app/auth/containers';
import { LoginGuard } from './services/login-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Logowanie' }, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
