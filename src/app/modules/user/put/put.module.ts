import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammingComponent } from './programming/programming.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { BillingComponent } from './billing/billing.component';
import { PutRoutingModule } from './put-routing.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { GetModule } from '../get/get.module';
import { PutComponent } from './put/put.component';



@NgModule({
  declarations: [
    ProgrammingComponent,
    DeliveryComponent,
    DeliveryReportComponent,
    BillingComponent,
    PutComponent
  ],
  imports: [
    CommonModule,
    PutRoutingModule,
    DropdownModule,
    GetModule,
    FormsModule
  ]
})
export class PutModule { }
