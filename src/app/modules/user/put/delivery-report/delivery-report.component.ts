import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PutService } from '../../services/put.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html'
})
export class DeliveryReportComponent implements OnInit, OnDestroy {

  @Input() data: any;

  private subscription: Subscription[] = [];
  user: string = '';

  ID: any = '';
  EstadoEntrega: string = '1';
  CausaNoEntrega: string = '0';
  ValorEntregado: string = '';
  
  response: any = '';

  suggestions!: any[];
  options: any[] = [];

  loading: boolean = true;
  putDeliveryReport: boolean = false;
  
  constructor(
    private putService: PutService
  ) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem('deliveryReport')!);
    if (this.suggestions != null) {
      this.options = this.suggestions.map((item) => ({id: item.ID}) );
    }
  }

  search( event: any ) {
    if(this.suggestions != null) {
      const resp = this.suggestions.find((a) => a.ID == event.value.id);
      if (resp != null || resp != undefined) {
        this.EstadoEntrega = resp.EstadoEntrega;
        this.CausaNoEntrega = resp.CausaNoEntrega;
        this.ValorEntregado = resp.ValorEntregado;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  accept() {
    if (
      this.data.id != undefined && this.data.id != null &&
      this.EstadoEntrega != '' &&
      this.CausaNoEntrega != '' &&
      this.ValorEntregado != ''
      ) {
      this.putDeliveryReport = true;
      this.loading = true;
      const data = {
        ID: this.data.id,
        EstadoEntrega: this.EstadoEntrega,
        CausaNoEntrega: this.CausaNoEntrega,
        ValorEntregado: this.ValorEntregado,
        token: JSON.parse(localStorage.getItem('user')!).createdToken
      }

      this.subscription.push(
        this.putService.putDeliveryReport(data).subscribe((res) => {
          this.response = res.data[0].Mensaje;
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
    this.putDeliveryReport = false;
  }

}
