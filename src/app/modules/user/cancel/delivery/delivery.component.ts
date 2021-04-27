import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy {

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  private subscription: Subscription[] = [];
  delivery: [] = [];
  
  loading: boolean = true;
  cancelDelivery: boolean = false;

  resp: string = '';

  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit(): void { }

  anular( id: any ) {
    if(typeof(id) === 'object') {
      id = id.id;
    }
    this.cancelDelivery = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id
    };

    this.subscription.push(
      this.cancelService.cancelDelivery(data).subscribe((res) => {
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
    this.cancelDelivery = false;
  }

}
