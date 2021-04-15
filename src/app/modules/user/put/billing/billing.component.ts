import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PutService } from '../../services/put.service';
import { dispensacion } from '../dispensacion';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';

  ID: string = '';
  NoPrescripcion: string = '';
  TipoTec: string = '';
  ConTec: string = '';
  TipoIDPaciente: string = '';
  NoIDPaciente: string = '';
  NoEntrega: string = '';
  NoFactura: string = '';
  NoIDEPS: string = '';
  CodEPS: string = '';
  CodSerTecAEntregado: string = '';
  CantUnMinDis: string = '';
  ValorUnitFacturado: string = '';
  ValorTotFacturado: string = '';
  CuotaModer: string = '';
  Copago: string = '';
  
  response: any = '';

  suggestions!: any[];
  options: any[] = [];
  dispensacion = dispensacion;
  dis: string = '';

  loading: boolean = true;
  putBilling: boolean = false;
  
  constructor(
    private putService: PutService
  ) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem('billing')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => item.ID );
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value);
      if (resp != null || resp != undefined) {
        this.NoPrescripcion = resp.NoPrescripcion;
        this.TipoTec = resp.TipoTec;
        this.ConTec = resp.ConTec;
        this.TipoIDPaciente = resp.TipoIDPaciente;
        this.NoIDPaciente = resp.NoIDPaciente;
        this.NoEntrega = resp.NoEntrega;
        this.NoFactura = resp.NoFactura;
        this.NoIDEPS = resp.NoIDEPS;
        this.CodEPS = resp.CodEPS;
        this.CodSerTecAEntregado = resp.CodSerTecAEntregado;
        this.CantUnMinDis = resp.CantUnMinDis;
        this.ValorUnitFacturado = resp.ValorUnitFacturado;
        this.ValorTotFacturado = resp.ValorTotFacturado;
        this.CuotaModer = resp.CuotaModer;
        this.Copago = resp.Copago;
      }
    }
  }

  changeDis( $event: any ) {
    this.CantUnMinDis = $event.value;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  accept() {
    this.putBilling = true;
    this.loading = true;
    if (
      this.ID != '' &&
      this.NoPrescripcion != '' &&
      this.TipoTec != '' &&
      this.ConTec != '' &&
      this.TipoIDPaciente != '' &&
      this.NoIDPaciente != '' &&
      this.NoEntrega != '' &&
      this.NoFactura != '' &&
      this.NoIDEPS != '' &&
      this.CodEPS != '' &&
      this.CodSerTecAEntregado != '' &&
      this.CantUnMinDis != '' &&
      this.ValorUnitFacturado != '' &&
      this.ValorTotFacturado != '' &&
      this.CuotaModer != '' &&
      this.Copago != ''
    ) {

      const data = {
        ID: this.ID,
        NoPrescripcion: this.NoPrescripcion,
        TipoTec: this.TipoTec,
        ConTec: this.ConTec,
        TipoIDPaciente: this.TipoIDPaciente,
        NoIDPaciente: this.NoIDPaciente,
        NoEntrega: this.NoEntrega,
        NoFactura: this.NoFactura,
        NoIDEPS: this.NoIDEPS,
        CodEPS: this.CodEPS,
        CodSerTecAEntregado: this.CodSerTecAEntregado,
        CantUnMinDis: this.CantUnMinDis,
        ValorUnitFacturado: this.ValorUnitFacturado,
        ValorTotFacturado: this.ValorTotFacturado,
        CuotaModer: this.CuotaModer,
        Copago: this.Copago,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putBilling(data).subscribe((res) => {
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
    this.putBilling= false;
  }

}
