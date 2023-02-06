
import { NgModule } from '@angular/core';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DictionariesFilterComponent } from './components';
import { NewAluminumComponent, AluminumTableComponent, AluminumDetailsComponent } from './components';
import { NewSteelScrapComponent, SteelScrapTableComponent, SteelScrapDetailsComponent } from './components';
import { NewStainlessSteelComponent, StainlessSteelTableComponent, StainlessSteelDetailsComponent } from './components';
import { NewCopperComponent, CopperTableComponent, CopperDetailsComponent } from './components';
import { NewBrassComponent, BrassTableComponent, BrassDetailsComponent } from './components';
import { NewZincAndLeadComponent, ZincAndLeadTableComponent, ZincAndLeadDetailsComponent } from './components';
import { NewOtherComponent, OtherTableComponent, OtherDetailsComponent } from './components';
import { DictionariesPageComponent, AluminumPageComponent, SteelScrapPageComponent, StainlessSteelPageComponent, CopperPageComponent, BrassPageComponent, ZincAndLeadPageComponent, OtherPageComponent } from './containers';
import { SharedModule } from '@we-met-app/shared';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@we-met-app/material';

export const COMPONENTS = [
    NewSteelScrapComponent,
    SteelScrapTableComponent,
    SteelScrapDetailsComponent,
    NewAluminumComponent,
    AluminumTableComponent,
    AluminumDetailsComponent,
    NewStainlessSteelComponent,
    StainlessSteelTableComponent,
    StainlessSteelDetailsComponent,
    DictionariesFilterComponent,
    NewCopperComponent,
    CopperTableComponent,
    CopperDetailsComponent,
    NewBrassComponent,
    BrassTableComponent,
    BrassDetailsComponent,
    NewZincAndLeadComponent,
    ZincAndLeadTableComponent,
    ZincAndLeadDetailsComponent,
    NewOtherComponent,
    OtherTableComponent,
    OtherDetailsComponent,
];


export const CONTAINERS = [
    DictionariesPageComponent,
    SteelScrapPageComponent,
    AluminumPageComponent,
    StainlessSteelPageComponent,
    CopperPageComponent,
    BrassPageComponent,
    ZincAndLeadPageComponent,
    OtherPageComponent
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        DictionariesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        LayoutModule,
    ],
    entryComponents: [
        NewSteelScrapComponent,
        NewAluminumComponent,
        NewStainlessSteelComponent,
        NewCopperComponent,
        NewBrassComponent,
        NewZincAndLeadComponent,
        NewOtherComponent
    ],
    declarations: [COMPONENTS, CONTAINERS]
})
export class DictionariesModule { }
