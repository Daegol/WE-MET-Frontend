import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from '@we-met-app/auth/effects';
import { AuthStore } from '..';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AuthStore.authFeatureKey, AuthStore.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthStoreModule { }
