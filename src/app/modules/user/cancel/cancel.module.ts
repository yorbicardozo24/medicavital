import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing/billing.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ProgrammingComponent } from './programming/programming.component';
import { CancelRoutingModule } from './cancel-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { GetModule } from '../get/get.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    BillingComponent,
    DeliveryReportComponent,
    DeliveryComponent,
    ProgrammingComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    CancelRoutingModule,
    DropdownModule,
    GetModule,
    FormsModule
  ]
})
export class CancelModule { }
