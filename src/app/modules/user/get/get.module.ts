import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressingComponent } from './addressing/addressing.component';
import { ProgrammingComponent } from './programming/programming.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { BillingComponent } from './billing/billing.component';
import { GetRoutingModule } from './get-routing.module';



@NgModule({
  declarations: [
    AddressingComponent,
    ProgrammingComponent,
    DeliveryComponent,
    DeliveryReportComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    GetRoutingModule
  ]
})
export class GetModule { }
