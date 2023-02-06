import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@we-met-app/material';

import { AddCommasPipe } from '@we-met-app/shared/pipes/add-commas.pipe';
import { EllipsisPipe } from '@we-met-app/shared/pipes/ellipsis.pipe';
import { DeleteConfirmationDialogComponent, TableSelectionComponent } from './components';
import { ConnectFormDirective } from './directives/connect-form.directive';
import { HideAuthorizedDirective } from './directives/hide-authorized.directive';
import { HideUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { ReadonlyUnauthaorizedDirective } from './directives/readonly-unauthorized.directive';
import { ButtonTitlesPipe } from './pipes/button-titles.pipe';
import { ErrorMessagesPipe } from './pipes/error-messages.pipe';
import { FilterOnPropPipe } from './pipes/filter.pipe';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { PatternPipe } from './pipes/pattern.pipe';

export const PIPES = [AddCommasPipe, EllipsisPipe, FilterOnPropPipe, PatternPipe, ErrorMessagesPipe, LimitStringPipe, ButtonTitlesPipe];
export const DIRECTIVES = [ConnectFormDirective, HideUnauthorizedDirective, HideAuthorizedDirective, ReadonlyUnauthaorizedDirective];
export const COMPONENTS = [TableSelectionComponent, DeleteConfirmationDialogComponent]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations:
    [PIPES, DIRECTIVES, COMPONENTS],
  exports:
    [PIPES, DIRECTIVES, COMPONENTS]
})
export class SharedModule { }
