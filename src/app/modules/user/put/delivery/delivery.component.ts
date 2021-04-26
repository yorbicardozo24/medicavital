import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PutService } from '../../services/put.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy, OnChanges {

  @Input() delivery: any;

  private subscription: Subscription[] = [];
  ID: any = '';
  CodSerTecEntregado: string = '';
  CantTotEntregada: string = '';
  EntTotal: string = '0';
  CausaNoEntrega: string = '0';
  FecEntrega: string = '';
  NoLote: string = 'NULL';
  TipoIDRecibe: string = 'CC';
  NoIDRecibe: string = '';
  user: string = '';
  
  response: any = '';

  suggestions!: any[];
  options: any[] = [];

  loading: boolean = true;
  putDelivery: boolean = false;
  
  constructor(
    private putService: PutService
  ) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem('delivery')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
    }

    const deliveryPut = JSON.parse(localStorage.getItem('deliveryPut')!);

    if (deliveryPut != null) {
      this.FecEntrega = deliveryPut.FecEntrega;
      this.NoIDRecibe = deliveryPut.NoIDRecibe;
    }
  }

  ngOnChanges() {
    const deliveryPut = JSON.parse(localStorage.getItem('deliveryPut')!);
    if (deliveryPut == null) {
      this.FecEntrega = ''
      this.NoIDRecibe = '';
      this.EntTotal = '0';
      this.CausaNoEntrega = '0';
      this.NoLote = 'NULL';
      this.TipoIDRecibe = 'CC';
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value.id);
      if (resp != null || resp != undefined) {
        this.CodSerTecEntregado = resp.CodSerTecEntregado;
        this.CantTotEntregada = resp.CantTotEntregada;
        this.EntTotal = resp.EntTotal;
        this.CausaNoEntrega = resp.CausaNoEntrega;
        this.FecEntrega = resp.FecEntrega;
        this.NoLote = resp.NoLote;
        this.TipoIDRecibe = resp.TipoIDRecibe;
        this.NoIDRecibe = resp.NoIDRecibe;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  accept() {
    if (
      this.delivery.id != undefined && this.delivery.id != null &&
      this.delivery.CodSerTecAEntregar != undefined && this.delivery.CodSerTecAEntregar != null &&
      this.delivery.CantTotAEntregar != undefined && this.delivery.CantTotAEntregar != null &&
      this.delivery.EntTotal != undefined && this.delivery.EntTotal != null &&
      this.delivery.CausaNoEntrega != undefined && this.delivery.CausaNoEntrega != null &&
      this.FecEntrega != '' &&
      this.delivery.NoLote != undefined &&
      this.delivery.TipoIDRecibe != undefined && this.delivery.TipoIDRecibe != null &&
      this.NoIDRecibe != ''
    ) {

      this.putDelivery = true;
      this.loading = true;

      const data = {
        ID: this.delivery.id,
        CodSerTecEntregado: this.delivery.CodSerTecAEntregar,
        CantTotEntregada: this.delivery.CantTotAEntregar,
        EntTotal: this.delivery.EntTotal,
        CausaNoEntrega: this.delivery.CausaNoEntrega,
        FecEntrega: this.FecEntrega,
        NoLote: this.delivery.NoLote,
        TipoIDRecibe: this.delivery.TipoIDRecibe,
        NoIDRecibe: this.NoIDRecibe,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putDelivery(data).subscribe((res) => {
          console.log(res);
          this.response = res.data;
          localStorage.setItem('update', 'true');
          this.setState();
        }, (err) => {
          this.response = err.error.message;
          this.setState();
        })
      );
    }
  }

  setState() {
    this.loading = false;
    this.putDelivery = false;
  }

  changeForm() {
    const data = {
      ID: this.delivery.id,
      CodSerTecEntregado: this.delivery.CodSerTecAEntregar,
      CantTotEntregada: this.delivery.CantTotAEntregar,
      EntTotal: this.delivery.EntTotal,
      CausaNoEntrega: this.delivery.CausaNoEntrega,
      FecEntrega: this.FecEntrega,
      NoLote: this.delivery.NoLote,
      TipoIDRecibe: this.delivery.TipoIDRecibe,
      NoIDRecibe: this.NoIDRecibe,
      token: JSON.parse(localStorage.getItem('user')!).createdToken
    }

    localStorage.setItem('deliveryPut', JSON.stringify(data));
  }

}
