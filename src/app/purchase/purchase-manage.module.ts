import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@we-met-app/material';
import { SharedModule } from '@we-met-app/shared';
import { PurchaseManageRoutingModule } from './purchase-manage-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPurchaseComponent, PurchasesTableComponent, PurchasesFilterComponent, PurchasesDetailComponent } from './components';
import { PurchasesPageComponent, PurchaseManagePageComponent } from './containers';
import { PurchasesLookupComponent } from './components/purchases/purchases-lookup/purchases-lookup.component';

export const COMPONENTS = [
  PurchasesTableComponent,
  NewPurchaseComponent,
  PurchasesFilterComponent,
  PurchasesDetailComponent,
  PurchasesLookupComponent
];

export const CONTAINERS = [
  PurchaseManagePageComponent,
  PurchasesPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PurchaseManageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [

  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class PurchaseManageModule { }
