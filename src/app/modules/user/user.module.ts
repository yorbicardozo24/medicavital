import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GetAllComponent } from './get-all/get-all.component';
import { FormsModule } from '@angular/forms';
import { GetModule } from './get/get.module';
import { PutModule } from './put/put.module';
import { PrintComponent } from './print/print.component';



@NgModule({
  declarations: [
    UserComponent,
    GetAllComponent,
    PrintComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    GetModule,
    PutModule
  ]
})
export class UserModule { }
