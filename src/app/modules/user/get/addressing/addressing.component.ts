import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  }

  search( termino: any ) {
    this.searchAddressing = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    this.subscription.push(
      this.getService.getAddressing(data).subscribe((res) => {
        this.addressing = res.data;
        this.addressingData = res.data;
        this.setState();
        localStorage.setItem('addressing', JSON.stringify(this.addressing));
      }, () => this.setState() )
    );

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
    this.addressing = this.addressingData;
  }

  print( $event: any) {
    this.router.navigate([`/user/print`, {id: $event.id, idFact: $event.idFact}]);
  }

  noDelivery( $event: any ) {
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
