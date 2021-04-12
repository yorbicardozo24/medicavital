import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammingComponent } from './programming/programming.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { BillingComponent } from './billing/billing.component';
import { PutRoutingModule } from './put-routing.module';



@NgModule({
  declarations: [
    ProgrammingComponent,
    DeliveryComponent,
    DeliveryReportComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    PutRoutingModule
  ]
})
export class PutModule { }
