import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html'
})
export class PrintComponent implements OnInit {

  data: string[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    const programming = JSON.parse(localStorage.getItem('programming')!);
    const delivery = JSON.parse(localStorage.getItem('delivery')!);
    const deliveryReport = JSON.parse(localStorage.getItem('deliveryReport')!);
    const billing = JSON.parse(localStorage.getItem('billing')!);

    if(billing != null) {
      const billingData = billing.filter((item: any) => item.ID == id);
      if(billingData.length > 0) {
        this.data = billingData;
        if(this.data.length > 0) {
          setTimeout(() => {
            window.print();
          }, 2000)
        }
      } else {
        const programmingData = programming.filter((item: any) => item.ID == id);
        if(programmingData.length > 0) {
          this.data.push(programmingData);
        }
        const deliveryData = delivery.filter((item: any) => item.ID == id);
        if(deliveryData.length > 0) {
          this.data.push(deliveryData);
        }
        const deliveryReportData = deliveryReport.filter((item: any) => item.ID == id);
        if(deliveryReportData.length > 0) {
          this.data.push(deliveryReportData);
        }

        if (this.data.length > 0) {
          setTimeout(() => {
            window.print();
          }, 2000)
        } else {
          alert('Id no encontrado');
        }
      }
    }
    
  }

}
