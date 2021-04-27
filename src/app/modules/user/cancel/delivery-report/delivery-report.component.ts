import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html'
})
export class DeliveryReportComponent implements OnInit, OnDestroy {

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  private subscription: Subscription[] = [];
  deliveryReport: [] = [];
  
  loading: boolean = true;
  cancelDeliveryReport: boolean = false;

  resp: string = '';

  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit(): void { }

  anular( id: any ) {
    this.cancelDeliveryReport = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id
    };

    this.subscription.push(
      this.cancelService.cancelDeliveryReport(data).subscribe((res) => {
        this.resp = res.data[0].Mensaje;
        this.setState();
        Swal.fire(
          'Anulado',
          `${res.data[0].Mensaje}`,
          'success'
        ).then( () => {
          this.onChange.emit(localStorage.getItem('mipres'));
        });
      }, (err) => {
        this.resp = err.error.message;
        this.setState();
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.cancelDeliveryReport = false;
  }

}
