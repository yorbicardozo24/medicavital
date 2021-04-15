import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from '../put/billing/billing.component';
import { DeliveryReportComponent } from '../put/delivery-report/delivery-report.component';
import { DeliveryComponent } from '../put/delivery/delivery.component';
import { ProgrammingComponent } from '../put/programming/programming.component';


const routes: Routes = [
    {
        path: 'programming',
        component: ProgrammingComponent,
    },
    {
        path: 'delivery',
        component: DeliveryComponent
    },
    {
        path: 'delivery-report',
        component: DeliveryReportComponent
    },
    {
        path: 'billing',
        component: BillingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PutRoutingModule { }