import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from '../get/billing/billing.component';
import { DeliveryReportComponent } from '../get/delivery-report/delivery-report.component';
import { DeliveryComponent } from '../get/delivery/delivery.component';
import { ProgrammingComponent } from '../get/programming/programming.component';


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