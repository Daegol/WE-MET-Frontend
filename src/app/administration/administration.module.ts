import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@we-met-app/material';
import { SharedModule } from '@we-met-app/shared';
import { AdministrationRoutingModule } from '@we-met-app/administration/administration-routing.module';
import { AdministrationPageComponent } from '@we-met-app/administration/containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PersonnelLookupComponent, SetPersonnelPasswordComponent, PersonnelTableComponent, NewPersonnelComponent, PersonnelDetailComponent, PersonnelFilterComponent,
  PersonnelDetailRolesTableComponent, PersonnelDetailGroupsTableComponent
} from '@we-met-app/administration/components';
import { PersonnelListComponent } from '@we-met-app/administration/containers';
import { AddGroupComponent } from './components/personnel/personnel-detail/personnel-detail-groups/personnel-detail-add-group/add-group.component';
import { DeleteConfirmationDialogComponent } from '@we-met-app/shared/components';

export const COMPONENTS = [
  PersonnelTableComponent,
  NewPersonnelComponent,
  PersonnelDetailComponent,
  PersonnelFilterComponent,
  PersonnelLookupComponent,
  SetPersonnelPasswordComponent,
  PersonnelDetailRolesTableComponent,
  PersonnelDetailGroupsTableComponent,
  AddGroupComponent
];

export const CONTAINERS = [
  AdministrationPageComponent,
  PersonnelListComponent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    NewPersonnelComponent,
    AddGroupComponent,
    DeleteConfirmationDialogComponent
  ],
  declarations: [COMPONENTS, CONTAINERS]
})
export class AdministrationModule { }
