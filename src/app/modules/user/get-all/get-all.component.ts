import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {

  user: string = '';

  programmingData: string[] = [];
  deliveryData: string[] = [];
  deliveryReportData: string[] = [];
  billingData: string[] = [];
  programming: string[] = [];
  delivery: string[] = [];
  deliveryReport: string[] = [];
  billing: string[] = [];
  
  loading: boolean = true;
  searchAll: boolean = false;

  constructor(
    private getService: GetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    const programming = JSON.parse(localStorage.getItem('programming')!);
    if (programming != null) {
      this.loading = false;
      this.programming = programming;
      this.programmingData = programming;
    }
    const delivery = JSON.parse(localStorage.getItem('delivery')!);
    if (delivery != null) {
      this.loading = false;
      this.delivery = delivery;
      this.deliveryData = delivery;
    }
    const deliveryReport = JSON.parse(localStorage.getItem('deliveryReport')!);
    if (deliveryReport != null) {
      this.loading = false;
      this.deliveryReport = deliveryReport;
      this.deliveryReportData = delivery;
    }
    const billing = JSON.parse(localStorage.getItem('billing')!);
    if (billing != null) {
      this.loading = false;
      this.billing = billing;
      this.billingData = billing;
    }
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
      billing: this.getService.getBilling(data),
      addressing: this.getService.getAddressing(data)
    })
    .subscribe(({programming, delivery, deliveryReport, billing, addressing}) => {
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
      localStorage.setItem('programming', JSON.stringify(this.programming));
      localStorage.setItem('addressing', JSON.stringify(addressing.data));
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
    this.programming = this.programmingData.filter((item: any) => item.FecAnulacion === null );
    this.delivery = this.deliveryData.filter((item: any) => item.FecAnulacion === null );
    this.deliveryReport = this.deliveryReportData.filter((item: any) => item.FecAnulacion === null );
    this.billing = this.billingData.filter((item: any) => item.FecAnulacion === null );
  }

  showCanceled() {
    this.programming = this.programmingData;
    this.delivery = this.deliveryData;
    this.deliveryReport = this.deliveryReportData;
    this.billing = this.billingData;
  }

  print( $event: any) {
    this.router.navigate([`/user/print`, {id: $event.id, idFact: $event.idFact}]);
  }

  noDelivery( $event: any ) {
    this.programming = this.programmingData.filter((item: any) => item.NoEntrega == $event );
    this.delivery = this.deliveryData.filter((item: any) => item.NoEntrega == $event );
    this.deliveryReport = this.deliveryReportData.filter((item: any) => item.NoEntrega == $event );
    this.billing = this.billingData.filter((item: any) => item.NoEntrega == $event );
  }

}
