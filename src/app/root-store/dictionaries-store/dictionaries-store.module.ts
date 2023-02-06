import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as DictionariesStore from '@we-met-app/root-store/dictionaries-store/dictionaries-state';
import { AluminumEffects, BrassEffects, CopperEffects, OtherEffects, StainlessSteelEffects, SteelScrapEffects, ZincAndLeadEffects } from '@we-met-app/dictionaries/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(DictionariesStore.dictionariesFeatureKey, DictionariesStore.reducers),
    EffectsModule.forFeature([SteelScrapEffects, AluminumEffects, StainlessSteelEffects, CopperEffects, BrassEffects, ZincAndLeadEffects, OtherEffects]),
  ]
})
export class DictionariesStoreModule { }
