import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@we-met-app/material';
import {
  ToolbarComponent, MenuComponent, MenuListItemComponent
} from '@we-met-app/core/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@we-met-app/shared';
import { NgModule } from '@angular/core';
import { AccessDeniedPageComponent } from '@we-met-app/core/containers/access-denied/access-denied-page.component';
import { NotFoundPageComponent } from '@we-met-app/core/containers/not-found/not-found-page.component';
import { AppComponent } from '@we-met-app/core/containers/app/app.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  AccessDeniedPageComponent,
  ToolbarComponent,
  MenuComponent,
  MenuListItemComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule, SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule { }
