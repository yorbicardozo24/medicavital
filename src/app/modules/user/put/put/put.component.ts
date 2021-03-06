import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html'
})
export class PutComponent implements OnInit {

  user: string = '';
  id: string = '';

  suggestions!: any[];
  options: any[] = [];

  data = {};
  delivery = {};
  deliveryReport = {};
  billing = {};

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem('addressing')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
    }
    const putId = localStorage.getItem('putId');
    if (putId != undefined) {
      this.id = putId;
      this.search();
    }
  }

  search() {
    localStorage.setItem('putId', this.id);
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == this.id);
      if (resp != null || resp != undefined) {
        const programmingPut = JSON.parse(localStorage.getItem('programmingPut')!);
        if (programmingPut != null && this.id == programmingPut.id) {
          this.data = programmingPut;
        } else {
          localStorage.removeItem('programmingPut');
          this.data = {
            id: this.id,
            fec: resp.FecMaxEnt,
            codSerTec: resp.CodSerTecAEntregar,
            cantidad: resp.CantTotAEntregar
          }
        }

        const deliveryPut = JSON.parse(localStorage.getItem('deliveryPut')!);
        if (deliveryPut != null && this.id == deliveryPut.ID) {
          this.delivery = {
            id: this.id,
            CodSerTecAEntregar: deliveryPut.CodSerTecEntregado,
            CantTotAEntregar: deliveryPut.CantTotEntregada,
            EntTotal: deliveryPut.EntTotal,
            CausaNoEntrega: deliveryPut.CausaNoEntrega,
            NoLote: deliveryPut.NoLote,
            TipoIDRecibe: deliveryPut.TipoIDRecibe,
          }
        } else {
          localStorage.removeItem('deliveryPut');
          this.delivery = {
            id: this.id,
            CodSerTecAEntregar: resp.CodSerTecAEntregar,
            CantTotAEntregar: resp.CantTotAEntregar,
            EntTotal: '0',
            CausaNoEntrega: '0',
            NoLote: 'NULL',
            TipoIDRecibe: 'CC',
          }
        }
        
        const deliveryReportPut = JSON.parse(localStorage.getItem('deliveryReportPut')!);
        if (deliveryReportPut != null && this.id == deliveryReportPut.ID) {
          this.deliveryReport = {
            id: this.id
          }
        } else {
          localStorage.removeItem('deliveryReportPut');
          this.deliveryReport = {
            id: this.id
          }
        }

        const billingPut = JSON.parse(localStorage.getItem('billingPut')!);
        if (billingPut != null && this.id == billingPut.ID) {
          this.billing = {
            id: this.id,
            NoPrescripcion: billingPut.NoPrescripcion,
            TipoTec: billingPut.TipoTec,
            ConTec: billingPut.ConTec,
            TipoIDPaciente: billingPut.TipoIDPaciente,
            NoIDPaciente: billingPut.NoIDPaciente,
            NoEntrega: billingPut.NoEntrega,
            NoIDEPS: billingPut.NoIDEPS,
            CodEPS: billingPut.CodEPS,
            CodSerTecAEntregarBilling: billingPut.CodSerTecAEntregado
          }
        } else {
          localStorage.removeItem('billingPut');
          this.billing = {
            id: this.id,
            NoPrescripcion: resp.NoPrescripcion,
            TipoTec: resp.TipoTec,
            ConTec: resp.ConTec,
            TipoIDPaciente: resp.TipoIDPaciente,
            NoIDPaciente: resp.NoIDPaciente,
            NoEntrega: resp.NoEntrega,
            NoIDEPS: resp.NoIDEPS,
            CodEPS: resp.CodEPS,
            CodSerTecAEntregarBilling: resp.CodSerTecAEntregar,
            CuotaModer: '0',
            Copago: '0',
          }
        }

      }
    }
  }

}
