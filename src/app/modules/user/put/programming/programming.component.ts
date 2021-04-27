import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PutService } from '../../services/put.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html'
})
export class ProgrammingComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data: any;

  private subscription: Subscription[] = [];
  user: string = '';
  id: any = '';
  fec: string = '';
  tipoId: string = 'NI';
  noIdSede: string = '900843971';
  codSede: string = 'PROV000786';
  codSerTec: string = '';
  cantidad: string = '';
  response: any = '';

  suggestions!: any[];
  options: any[] = [];

  loading: boolean = true;
  putProgramming: boolean = false;
  
  constructor(
    private putService: PutService
  ) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem('programming')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
    }
    const programmingPut = JSON.parse(localStorage.getItem('programmingPut')!);

    if (programmingPut != null) {
      this.tipoId = programmingPut.tipoId;
      this.noIdSede = programmingPut.noIdSede;
      this.codSede = programmingPut.codSede;
    }
  }

  ngOnChanges() {
    const programmingPut = JSON.parse(localStorage.getItem('programmingPut')!);

    if (programmingPut == null) {
      this.tipoId = 'NI';
      this.noIdSede = '900843971';
      this.codSede = 'PROV000786';
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value.id);
      if (resp != null || resp != undefined) {
        this.fec = resp.FecMaxEnt;
        this.codSerTec = resp.CodSerTecAEntregar;
        this.cantidad = resp.CantTotAEntregar;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  accept() {
    if (
      this.data.id != undefined && this.data.id != null && this.data.id != '' &&
      this.data.fec != undefined && this.data.fec != null && this.data.fec.trim() != '' &&
      this.tipoId.trim() != '' &&
      this.noIdSede.trim() != '' &&
      this.codSede.trim() != '' &&
      this.data.codSerTec != undefined && this.data.codSerTec != null && this.data.codSerTec.trim() != '' &&
      this.data.cantidad != undefined && this.data.cantidad != null && this.data.cantidad.trim() != ''
    ) {

      this.putProgramming = true;
      this.loading = true;

      const data = {
        id: this.data.id,
        fec: this.data.fec,
        tipoId: this.tipoId,
        noIdSede: this.noIdSede,
        codSede: this.codSede,
        codSerTec: this.data.codSerTec,
        cantidad: this.data.cantidad,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putProgramming(data).subscribe((res) => {
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
    this.putProgramming = false;
  }

  changeForm() {
    const data = {
      id: this.data.id,
      fec: this.data.fec,
      tipoId: this.tipoId,
      noIdSede: this.noIdSede,
      codSede: this.codSede,
      codSerTec: this.data.codSerTec,
      cantidad: this.data.cantidad,
    }

    localStorage.setItem('programmingPut', JSON.stringify(data));
  }

}
