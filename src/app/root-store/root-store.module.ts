import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { CoreStoreModule } from './core-store/core-store.module';
import { MyPageStoreModule } from './my-page-store/my-page-store.module';
import { DictionariesStoreModule } from './dictionaries-store/dictionaries-store.module';
import { AdministrationStoreModule } from './administration-store/administration-store.module';
import { PurchaseManageStoreModule } from './purchase-manage-store/purchase-manage-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthStoreModule,
    CoreStoreModule,
    AdministrationStoreModule,
    DictionariesStoreModule,
    MyPageStoreModule,
    PurchaseManageStoreModule
  ]
})
export class RootStoreModule { }
