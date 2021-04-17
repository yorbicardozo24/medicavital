import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAllComponent } from './get-all/get-all.component';
import { PrintComponent } from './print/print.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full'
            },
            {
                path: 'all',
                component: GetAllComponent
            },
            {
                path: 'get',
                loadChildren: () => import('./get/get.module').then((m) => m.GetModule),
            },
            {
                path: 'put',
                loadChildren: () => import('./put/put.module').then((m) => m.PutModule),
            },
            {
                path: 'cancel',
                loadChildren: () => import('./cancel/cancel.module').then((m) => m.CancelModule),
            }
        ]
    },
    {
        path: 'print/:id',
        component: PrintComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }