import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as PurchaseManageStore from '@we-met-app/root-store/purchase-manage-store/purchase-manage-state';
import { EffectsModule } from '@ngrx/effects';
import { PurchasesEffects } from '@we-met-app/purchase/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(PurchaseManageStore.purchaseManageFeatureKey, PurchaseManageStore.reducers),
    EffectsModule.forFeature([PurchasesEffects]),
  ]
})
export class PurchaseManageStoreModule { }
