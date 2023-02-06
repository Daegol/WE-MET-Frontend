import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services';
import { AccessDeniedPageComponent, NotFoundPageComponent } from './core/containers';
import { DictionariesModule } from './dictionaries';
import { AdministrationModule } from './administration';
import { PurchaseManageModule } from './purchase';
const routes: Routes = [
  { path: '', redirectTo: '/mypage', pathMatch: 'full' },
  {
    path: 'mypage',
    loadChildren: () => import('@we-met-app/my-page/my-page.module').then((m) => m.MyPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'administration',
    loadChildren: () => AdministrationModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'administration/dictionaries',
    loadChildren: () => DictionariesModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'purchase-manage',
    loadChildren: () => PurchaseManageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedPageComponent,
    data: { title: 'Odmowa dostępu' },
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Nie znaleziono' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
