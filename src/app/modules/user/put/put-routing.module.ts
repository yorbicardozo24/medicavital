import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PutComponent } from './put/put.component';


const routes: Routes = [
    {
        path: '',
        component: PutComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PutRoutingModule { }