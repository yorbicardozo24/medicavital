import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  delivery: [] = [];
  
  loading: boolean = true;
  searchDelivery: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
  }

  search( termino: any ) {
    this.searchDelivery = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    this.subscription.push(
      this.getService.getDelivery(data).subscribe((res) => {
        this.delivery = res.data;
        this.setState();
      }, () => this.setState() )
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchDelivery = false;
  }

}
