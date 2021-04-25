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

  data: any;

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

    const filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter != null ){
      this.data = filter;
      this.noDelivery(filter);
    }
  }

  search(termino: any) {
    localStorage.setItem('mipres', termino);
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
    this.programming = this.programming.filter((item: any) => item.FecAnulacion === null );
    this.delivery = this.delivery.filter((item: any) => item.FecAnulacion === null );
    this.deliveryReport = this.deliveryReport.filter((item: any) => item.FecAnulacion === null );
    this.billing = this.billing.filter((item: any) => item.FecAnulacion === null );
  }

  showCanceled() {
    localStorage.removeItem('filter');
    this.programming = this.programmingData;
    this.delivery = this.deliveryData;
    this.deliveryReport = this.deliveryReportData;
    this.billing = this.billingData;
  }

  print( $event: any) {
    this.router.navigate([`/user/print`, {id: $event.id, idFact: $event.idFact}]);
  }

  noDelivery( $event: any ) {
    localStorage.setItem('filter', JSON.stringify($event));
    if ($event.tipo != '' && $event.conTec != '' && $event.nEntrega != '') {
      this.filterAll($event)
    } else if ($event.tipo != '' && $event.conTec == '' && $event.nEntrega == '') {
      this.filterByTipo($event.tipo);
    } else if ($event.tipo == '' && $event.conTec != '' && $event.nEntrega == '') {
      this.filterByConTec($event.conTec);
    } else if ($event.tipo != '' && $event.conTec != '' && $event.nEntrega == '') {
      this.filterByTipoAndConTec($event.tipo, $event.conTec);
    }
  }

  filterByTipoAndConTec(tipo: string, conTec: any) {
    this.programming = 
    this.programming.filter(
      (item: any) =>
        item.TipoTec == tipo && 
        item.ConTec == conTec
      );
  this.delivery = 
    this.delivery.filter(
      (item: any) =>
        item.TipoTec == tipo &&
        item.ConTec == conTec
      );
  this.deliveryReport = 
    this.deliveryReport.filter(
      (item: any) => 
        item.TipoTec == tipo &&
        item.ConTec == conTec 
      );
  this.billing = 
    this.billing.filter(
      (item: any) => 
        item.TipoTec == tipo &&
        item.ConTec == conTec
      );
  }

  filterByConTec(conTec: any) {
    this.programming = 
    this.programming.filter(
      (item: any) =>
        item.ConTec == conTec
      );
  this.delivery = 
    this.delivery.filter(
      (item: any) =>
        item.ConTec == conTec
      );
  this.deliveryReport = 
    this.deliveryReport.filter(
      (item: any) => 
        item.ConTec == conTec
      );
  this.billing = 
    this.billing.filter(
      (item: any) => 
        item.ConTec == conTec
      );
  }

  filterByTipo(tipo: string) {
    this.programming = 
      this.programming.filter(
        (item: any) =>
          item.TipoTec == tipo
        );
    this.delivery = 
      this.delivery.filter(
        (item: any) =>
          item.TipoTec == tipo
        );
    this.deliveryReport = 
      this.deliveryReport.filter(
        (item: any) => 
          item.TipoTec == tipo
        );
    this.billing = 
      this.billing.filter(
        (item: any) => 
          item.TipoTec == tipo
        );
  }

  filterAll($event: any) {
    this.programming = 
      this.programming.filter(
        (item: any) =>
          item.TipoTec == $event.tipo && 
          item.ConTec == $event.conTec && 
          item.NoEntrega == $event.nEntrega
        );
    this.delivery = 
      this.delivery.filter(
        (item: any) =>
          item.TipoTec == $event.tipo &&
          item.ConTec == $event.conTec &&
          item.NoEntrega == $event.nEntrega
        );
    this.deliveryReport = 
      this.deliveryReport.filter(
        (item: any) => 
          item.TipoTec == $event.tipo &&
          item.ConTec == $event.conTec && 
          item.NoEntrega == $event.nEntrega
        );
    this.billing = 
      this.billing.filter(
        (item: any) => 
          item.TipoTec == $event.tipo &&
          item.ConTec == $event.conTec &&
          item.NoEntrega == $event.nEntrega
        );
  }

}
