import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PersonnelEffects } from '@we-met-app/administration/effects';
import * as AdministrationStore from '@we-met-app/root-store/administration-store/administration-state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AdministrationStore.administrationFeatureKey, AdministrationStore.reducers),
    EffectsModule.forFeature([PersonnelEffects]),
  ]
})
export class AdministrationStoreModule { }
