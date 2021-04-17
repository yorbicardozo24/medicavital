import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html'
})
export class DeliveryReportComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  deliveryReport: [] = [];
  
  loading: boolean = true;
  cancelDeliveryReport: boolean = false;

  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit(): void { }

  anular( id: any ) {
    if(typeof(id) === 'object') {
      id = id.id;
    }
    this.cancelDeliveryReport = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id
    };

    this.subscription.push(
      this.cancelService.cancelDeliveryReport(data).subscribe((res) => {
        this.deliveryReport = res.data;
        this.setState();
      }, (err) => {
        this.deliveryReport = err.error.message;
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
