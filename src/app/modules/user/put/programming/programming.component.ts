import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PutService } from '../../services/put.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html'
})
export class ProgrammingComponent implements OnInit, OnDestroy {

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
    this.suggestions = JSON.parse(localStorage.getItem('addressing')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
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
    this.putProgramming = true;
    this.loading = true;
    if (
      this.id != '' &&
      this.fec != '' &&
      this.tipoId != '' &&
      this.noIdSede != '' &&
      this.codSede != '' &&
      this.cantidad != ''
    ) {

      if(typeof(this.id) === 'object') {
        this.id = this.id.id;
      }

      const data = {
        id: this.id,
        fec: this.fec,
        tipoId: this.tipoId,
        noIdSede: this.noIdSede,
        codSede: this.codSede,
        codSerTec: this.codSerTec,
        cantidad: this.cantidad,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putProgramming(data).subscribe((res) => {
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
    this.putProgramming = false;
  }

}
