import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; import { DictionariesPageComponent, AluminumPageComponent, SteelScrapPageComponent, StainlessSteelPageComponent, CopperPageComponent, BrassPageComponent, ZincAndLeadPageComponent, OtherPageComponent } from './containers';
import { AluminumDetailsComponent, BrassDetailsComponent, CopperDetailsComponent, OtherDetailsComponent, ZincAndLeadDetailsComponent } from './components';
import { CanDeactivateGuard } from '@we-met-app/shared/guards/can-deactivate-guard';
import { aluminumRoles, brassRoles, copperRoles, otherRoles, stainlessSteelRoles, steelScrapRoles, zincAndLeadRoles } from '@we-met-app/globals/globals';
import { AuthGuard } from '@we-met-app/auth/services';
import { StainlessSteelDetailsComponent } from './components/stainless-steel/stainless-steel-details/stainless-steel-details.component';


export const routes: Routes = [
    {
        path: 'steel-scrap',
        component: SteelScrapPageComponent,
        data: { title: 'Złom stalowy', roles: steelScrapRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'steel-scrap/:id',
        component: AluminumDetailsComponent,
        data: { title: 'Złom stalowy. Edycja', roles: steelScrapRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'aluminum',
        component: AluminumPageComponent,
        data: { title: 'Aluminium', roles: aluminumRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'aluminum/:id',
        component: AluminumDetailsComponent,
        data: { title: 'Aluminium. Edycja', roles: aluminumRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'stainless-steel',
        component: StainlessSteelPageComponent,
        data: { title: 'Stal nierdzewna', roles: stainlessSteelRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'stainless-steel/:id',
        component: StainlessSteelDetailsComponent,
        data: { title: 'Stal nierdzewna. Edycja', roles: stainlessSteelRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'copper',
        component: CopperPageComponent,
        data: { title: 'Miedź', roles: copperRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'copper/:id',
        component: CopperDetailsComponent,
        data: { title: 'Miedź. Edycja', roles: copperRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'brass',
        component: BrassPageComponent,
        data: { title: 'Mosiądz', roles: brassRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'brass/:id',
        component: BrassDetailsComponent,
        data: { title: 'Mosiądz. Edycja', roles: brassRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'zinc-and-lead',
        component: ZincAndLeadPageComponent,
        data: { title: 'Cynk i ołów', roles: zincAndLeadRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'zinc-and-lead/:id',
        component: ZincAndLeadDetailsComponent,
        data: { title: 'Cynk i ołów. Edycja', roles: zincAndLeadRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'other',
        component: OtherPageComponent,
        data: { title: 'Aluminium', roles: otherRoles },
        canActivate: [AuthGuard],
    },
    {
        path: 'other/:id',
        component: OtherDetailsComponent,
        data: { title: 'Aluminium. Edycja', roles: otherRoles },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'dashboard',
        component: DictionariesPageComponent,
        canActivate: [AuthGuard],
        data: { title: 'Słowniki' },
    },
    {
        path: '',
        component: DictionariesPageComponent,
        canActivate: [AuthGuard],
        data: { title: 'Słowniki' },
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DictionariesRoutingModule { }
