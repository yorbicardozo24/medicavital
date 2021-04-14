import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressingComponent } from './addressing/addressing.component';
import { ProgrammingComponent } from './programming/programming.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';
import { BillingComponent } from './billing/billing.component';
import { GetRoutingModule } from './get-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { LoadingComponent } from './loading/loading.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    AddressingComponent,
    ProgrammingComponent,
    DeliveryComponent,
    DeliveryReportComponent,
    BillingComponent,
    SearchComponent,
    LoadingComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    GetRoutingModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    LoadingComponent,
    ContentComponent
  ]
})
export class GetModule { }
