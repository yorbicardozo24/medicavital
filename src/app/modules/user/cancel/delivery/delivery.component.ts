import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  delivery: [] = [];
  
  loading: boolean = true;
  cancelDelivery: boolean = false;

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
        this.loading = res.data;
        this.setState();
      }, (err) => {
        this.loading = err.error.message;
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
