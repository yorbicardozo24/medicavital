import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-addressing',
  templateUrl: './addressing.component.html'
})
export class AddressingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  addressing: string[] = [];
  addressingData: string[] = [];
  
  loading: boolean = true;
  searchAddressing: boolean = false;
  data: any;

  constructor(
    private getService: GetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    const addressing = JSON.parse(localStorage.getItem('addressing')!);
    if (addressing != null) {
      this.loading = false;
      this.addressing = addressing;
      this.addressingData = addressing;
    }

    const filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter != null ){
      this.data = filter;
      this.noDelivery(filter);
    } 
  }

  search( termino: any ) {
    this.searchAddressing = true;
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
      this.addressing = addressing.data;
      this.addressingData = addressing.data;
      localStorage.setItem('delivery', JSON.stringify(delivery.data));
      localStorage.setItem('deliveryReport', JSON.stringify(deliveryReport.data));
      localStorage.setItem('billing', JSON.stringify(billing.data));
      localStorage.setItem('programming', JSON.stringify(programming.data));
      localStorage.setItem('addressing', JSON.stringify(addressing.data));
    }, () => {
      this.setState();
    });

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchAddressing = false;
  }

  toggleCanceled(hide: boolean) {
    if(hide) {
      this.hideCanceled();
    } else {
      this.showCanceled();
    }
  }

  hideCanceled() {
    this.addressing = this.addressing.filter((item: any) => item.FecAnulacion === null );
  }

  showCanceled() {
    localStorage.removeItem('filter');
    this.addressing = this.addressingData;
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
    this.addressing = 
    this.addressing.filter(
      (item: any) =>
        item.TipoTec == tipo && 
        item.ConTec == conTec
      );
  }

  filterByConTec(conTec: any) {
    this.addressing = 
    this.addressing.filter(
      (item: any) =>
        item.ConTec == conTec
      );
  }

  filterByTipo(tipo: string) {
    this.addressing = 
      this.addressing.filter(
        (item: any) =>
          item.TipoTec == tipo
        );
  }

  filterAll($event: any) {
    this.addressing = 
      this.addressing.filter(
        (item: any) =>
          item.TipoTec == $event.tipo && 
          item.ConTec == $event.conTec && 
          item.NoEntrega == $event.nEntrega
        );
  }

}
