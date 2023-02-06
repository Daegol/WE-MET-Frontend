import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasesPageComponent, PurchaseManagePageComponent } from './containers';
import { PurchasesDetailComponent, NewPurchaseComponent } from './components';
import { CanDeactivateGuard } from '@we-met-app/shared/guards/can-deactivate-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/purchase-manage/purchases', pathMatch: 'full' },
  {
    path: 'purchases',
    component: PurchasesPageComponent,
    data: { title: 'Zakupy' },
  },
  {
    path: 'purchases/:id',
    component: PurchasesDetailComponent,
    data: { title: 'Edycja zakupu' },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'purchases-add',
    component: NewPurchaseComponent,
    data: { title: 'Nowy zakup' },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    component: PurchaseManagePageComponent,
    data: { title: 'Zarządzanie zakupami' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseManageRoutingModule { }
