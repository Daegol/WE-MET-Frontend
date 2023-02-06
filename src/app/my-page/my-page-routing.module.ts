import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './containers';

export const routes: Routes = [
    {
        path: '',
        component: MyPageComponent,
        data: { title: 'Profil użytkownika' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyPageRoutingModule { }
