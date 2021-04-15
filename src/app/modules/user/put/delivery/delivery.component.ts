import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PutService } from '../../services/put.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  ID: string = '';
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
      this.options = this.suggestions.map((item) => item.ID );
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value);
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
    this.putDelivery = true;
    this.loading = true;
    if (
      this.ID != '' &&
      this.CodSerTecEntregado != '' &&
      this.CantTotEntregada != '' &&
      this.EntTotal != '' &&
      this.CausaNoEntrega != '' &&
      this.FecEntrega != '' &&
      this.NoLote != '' &&
      this.TipoIDRecibe != '' &&
      this.NoIDRecibe != ''
    ) {

      const data = {
        ID: this.ID,
        CodSerTecEntregado: this.CodSerTecEntregado,
        CantTotEntregada: this.CantTotEntregada,
        EntTotal: this.EntTotal,
        CausaNoEntrega: this.CausaNoEntrega,
        FecEntrega: this.FecEntrega,
        NoLote: this.NoLote,
        TipoIDRecibe: this.TipoIDRecibe,
        NoIDRecibe: this.NoIDRecibe,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putDelivery(data).subscribe((res) => {
          this.response = res;
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

}
