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
  }

  search() {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == this.id);
      if (resp != null || resp != undefined) {
        this.data = {
          id: this.id,
          fec: resp.FecMaxEnt,
          codSerTec: resp.CodSerTecAEntregar,
          cantidad: resp.CantTotAEntregar
        }
        
        this.delivery = {
          id: this.id,
          CodSerTecAEntregar: resp.CodSerTecAEntregar,
          CantTotAEntregar: resp.CantTotAEntregar,
          EntTotal: 0,
          CausaNoEntrega: 0,
          NoLote: 'NULL',
          TipoIDRecibe: 'CC',
        }

        this.deliveryReport = {
          id: this.id
        }

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
          CuotaModer: 0,
          Copago: 0,
        }
      }
    }
  }

}
