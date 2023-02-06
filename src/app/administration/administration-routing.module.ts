import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationPageComponent, PersonnelListComponent } from '@we-met-app/administration/containers';
import { CanDeactivateGuard } from '@we-met-app/shared/guards/can-deactivate-guard';
import { PersonnelDetailComponent } from './components';

export const routes: Routes = [
  {
    path: 'personnel',
    component: PersonnelListComponent,
    data: { title: 'Personnel' },
  },
  {
    path: 'personnel/:id',
    component: PersonnelDetailComponent,
    data: { title: 'Personnel edit' },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    component: AdministrationPageComponent,
    data: { title: 'Panel Admina' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }
