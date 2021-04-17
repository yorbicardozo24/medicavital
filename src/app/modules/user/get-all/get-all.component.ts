import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {

  user: string = '';

  programmingData: [] = [];
  deliveryData: [] = [];
  deliveryReportData: [] = [];
  billingData: [] = [];
  programming: [] = [];
  delivery: [] = [];
  deliveryReport: [] = [];
  billing: [] = [];
  
  loading: boolean = true;
  searchAll: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
  }

  search(termino: any) {
    this.searchAll = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    forkJoin({
      programming: this.getService.getProgramming(data),
      delivery: this.getService.getDelivery(data),
      deliveryReport: this.getService.getDeliveryReport(data),
      billing: this.getService.getBilling(data)
    })
    .subscribe(({programming, delivery, deliveryReport, billing}) => {
      this.setState();
      this.programmingData = programming.data;
      this.programming = programming.data;
      this.deliveryData = delivery.data;
      this.delivery = delivery.data;
      this.deliveryReportData = delivery.data;
      this.deliveryReport = deliveryReport.data;
      this.billing = billing.data;
      this.billingData = billing.data;
      localStorage.setItem('delivery', JSON.stringify(this.delivery));
      localStorage.setItem('deliveryReport', JSON.stringify(this.deliveryReport));
      localStorage.setItem('billing', JSON.stringify(this.billing));
      localStorage.setItem('addressing', JSON.stringify(this.programming));
    }, () => {
      this.setState();
    });

  }

  setState() {
    this.loading = false;
    this.searchAll = false;
  }

  toggleCanceled(hide: boolean) {
    if(hide) {
      this.hideCanceled();
    } else {
      this.showCanceled();
    }
  }

  hideCanceled() {
    // this.programming = this.programmingData.filter((item) => item.FecAnulacion != null);
  }

  showCanceled() {
    this.programming = this.programmingData;
  }

}
