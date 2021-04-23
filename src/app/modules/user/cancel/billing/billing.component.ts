import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  billing: [] = [];
  
  loading: boolean = true;
  cancelBilling: boolean = false;

  resp: string = '';

  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit(): void { }

  anular( id: any ) {
    this.cancelBilling = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id
    };

    this.subscription.push(
      this.cancelService.cancelBilling(data).subscribe((res) => {
        this.resp = res.data[0].Mensaje;
        this.setState();
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
    this.cancelBilling = false;
  }

}
