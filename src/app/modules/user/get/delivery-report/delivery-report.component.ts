import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html'
})
export class DeliveryReportComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  deliveryReport: [] = [];
  
  loading: boolean = true;
  searchDeliveryReport: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
  }

  search( termino: any ) {
    this.searchDeliveryReport = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    this.subscription.push(
      this.getService.getDeliveryReport(data).subscribe((res) => {
        this.deliveryReport = res.data;
        this.setState();
        localStorage.setItem('deliveryReport', JSON.stringify(this.deliveryReport));
      }, () => this.setState() )
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchDeliveryReport = false;
  }

}
