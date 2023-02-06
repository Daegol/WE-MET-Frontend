import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as MyPageStore from '@we-met-app/root-store/my-page-store/my-page-state';
import { EffectsModule } from '@ngrx/effects';
import { MyPageEffects } from '@we-met-app/my-page/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(MyPageStore.myPageFeatureKey, MyPageStore.reducers),
    EffectsModule.forFeature([MyPageEffects]),
  ]
})
export class MyPageStoreModule { }
