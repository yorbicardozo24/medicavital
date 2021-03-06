import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PutService } from '../../services/put.service';
import { dispensacion } from '../dispensacion';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data: any;

  private subscription: Subscription[] = [];
  user: string = '';

  ID: any = '';
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
  CuotaModer: string = '0';
  Copago: string = '0';
  NoSubEntrega: string = '0';
  
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
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
    }
    const billingPut = JSON.parse(localStorage.getItem('billingPut')!);

    if (billingPut != null) {
      this.NoFactura = billingPut.NoFactura;
      this.CantUnMinDis = billingPut.CantUnMinDis;
      this.ValorUnitFacturado = billingPut.ValorUnitFacturado;
      this.ValorTotFacturado = billingPut.ValorTotFacturado;
      this.NoSubEntrega = billingPut.NoSubEntrega;
      this.CuotaModer = billingPut.CuotaModer;
      this.Copago = billingPut.Copago;
    }
  }

  ngOnChanges() {
    const billingPut = JSON.parse(localStorage.getItem('billingPut')!);

    if (billingPut == null) {
      this.NoFactura = '';
      this.CantUnMinDis = '';
      this.ValorUnitFacturado = '';
      this.ValorTotFacturado = '';
      this.NoSubEntrega = '0';
      this.CuotaModer = '0';
      this.Copago = '0';
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value.id);
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
    this.changeForm();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  accept(): any {
    if (
      this.data.id != undefined && this.data.id != null && this.data.id.trim() != '' &&
      this.data.NoPrescripcion != undefined && this.data.NoPrescripcion != null && this.data.NoPrescripcion.trim() != '' &&
      this.data.TipoTec != undefined && this.data.TipoTec != null && this.data.TipoTec.trim() != '' &&
      this.data.ConTec != undefined && this.data.ConTec != null &&
      this.data.TipoIDPaciente != undefined && this.data.TipoIDPaciente != null && this.data.TipoIDPaciente.trim() != '' &&
      this.data.NoIDPaciente != undefined && this.data.NoIDPaciente != null && this.data.NoIDPaciente.trim() != '' &&
      this.data.NoEntrega != undefined && this.data.NoEntrega != null &&
      this.NoFactura.trim() != '' &&
      this.data.NoIDEPS != undefined && this.data.NoIDEPS != null && this.data.NoIDEPS.trim() != '' &&
      this.data.CodEPS != undefined && this.data.CodEPS != null && this.data.CodEPS.trim() != '' &&
      this.data.CodSerTecAEntregarBilling != undefined && this.data.CodSerTecAEntregarBilling != null && this.data.CodSerTecAEntregarBilling.trim() != '' &&
      this.CantUnMinDis.trim() != '' &&
      this.ValorUnitFacturado.trim() != '' &&
      this.ValorTotFacturado.trim() != '' &&
      this.CuotaModer.trim() != '' &&
      this.Copago.trim() != '' &&
      this.NoSubEntrega.trim() != ''
      ) {
        if (typeof(this.data.ConTec) === 'string') {
          if(this.data.ConTec.trim() == '') {
            return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Formulario incompleto',
            });
          }
        }
        if (typeof(this.data.NoEntrega) === 'string') {
          if(this.data.NoEntrega.trim() == '') {
            return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Formulario incompleto',
            });
          }
        }
      
      this.putBilling = true;
      this.loading = true;

      const data = {
        ID: this.data.id,
        NoPrescripcion: this.data.NoPrescripcion,
        TipoTec: this.data.TipoTec,
        ConTec: this.data.ConTec,
        TipoIDPaciente: this.data.TipoIDPaciente,
        NoIDPaciente: this.data.NoIDPaciente,
        NoEntrega: this.data.NoEntrega,
        NoSubEntrega: this.NoSubEntrega,
        NoFactura: this.NoFactura,
        NoIDEPS: this.data.NoIDEPS,
        CodEPS: this.data.CodEPS,
        CodSerTecAEntregado: this.data.CodSerTecAEntregarBilling,
        CantUnMinDis: this.CantUnMinDis,
        ValorUnitFacturado: this.ValorUnitFacturado,
        ValorTotFacturado: this.ValorTotFacturado,
        CuotaModer: this.CuotaModer,
        Copago: this.Copago,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putBilling(data).subscribe((res) => {
          console.log(res);
          this.response = `Put realizado correctamente.`;
          localStorage.setItem('update', 'true');
          this.setState();
        }, (err) => {
          this.response = err.error.message;
          this.setState();
        })
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Formulario incompleto',
      });
    }
  }

  setState() {
    this.loading = false;
    this.putBilling= false;
  }

  changeForm() {
    const data = {
      ID: this.data.id,
      NoPrescripcion: this.data.NoPrescripcion,
      TipoTec: this.data.TipoTec,
      ConTec: this.data.ConTec,
      TipoIDPaciente: this.data.TipoIDPaciente,
      NoIDPaciente: this.data.NoIDPaciente,
      NoEntrega: this.data.NoEntrega,
      NoSubEntrega: this.NoSubEntrega,
      NoFactura: this.NoFactura,
      NoIDEPS: this.data.NoIDEPS,
      CodEPS: this.data.CodEPS,
      CodSerTecAEntregado: this.data.CodSerTecAEntregarBilling,
      CantUnMinDis: this.CantUnMinDis,
      ValorUnitFacturado: this.ValorUnitFacturado,
      ValorTotFacturado: this.ValorTotFacturado,
      CuotaModer: this.CuotaModer,
      Copago: this.Copago
    }

    localStorage.setItem('billingPut', JSON.stringify(data));
  }

}
