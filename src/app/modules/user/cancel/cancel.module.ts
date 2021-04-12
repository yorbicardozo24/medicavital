import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing/billing.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ProgrammingComponent } from './programming/programming.component';
import { CancelRoutingModule } from './cancel-routing.module';



@NgModule({
  declarations: [
    BillingComponent,
    DeliveryReportComponent,
    DeliveryComponent,
    ProgrammingComponent
  ],
  imports: [
    CommonModule,
    CancelRoutingModule
  ]
})
export class CancelModule { }
