import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  billing: [] = [];
  
  loading: boolean = true;
  searchBilling: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
  }

  search( termino: any ) {
    this.searchBilling = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };
  
    this.subscription.push(
      this.getService.getBilling(data).subscribe((res) => {
        this.billing = res.data;
        this.setState();
        localStorage.setItem('billing', JSON.stringify(this.billing));
      }, () => this.setState() )
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchBilling = false;
  }

}
