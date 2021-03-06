import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from '../services/get.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styles: [
    'pre { display: block; color: #212529; margin: 0; padding: 0; border: none !important;}'
  ]
})
export class PrintComponent implements OnInit {

  data: string[] = [];

  programming: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private txt: GetService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const idFact = this.route.snapshot.params['idFact'];

    const programming = JSON.parse(localStorage.getItem('programming')!);
    const delivery = JSON.parse(localStorage.getItem('delivery')!);
    const deliveryReport = JSON.parse(localStorage.getItem('deliveryReport')!);
    const billing = JSON.parse(localStorage.getItem('billing')!);

    if (programming != null) {
      const programmingData = programming.filter((item: any) => item.ID == id);
      if(programmingData.length > 0) {
        this.programming = programmingData[0];
        this.data.push(programmingData[0]);
      }
    }

    if (delivery != null) {
      const deliveryData = delivery.filter((item: any) => item.ID == id);
      if(deliveryData.length > 0) {
        this.data.push(deliveryData[0]);
      }
    }

    if (deliveryReport != null) {
      const deliveryReportData = deliveryReport.filter((item: any) => item.ID == id);
      if(deliveryReportData.length > 0) {
        this.data.push(deliveryReportData[0]);
      }
    }

    if(billing != null) {
      const billingData = billing.filter((item: any) => item.ID == idFact);
      if(billingData.length > 0) {
        this.data.push(billingData[0]);
      }
    }

    if (this.data.length > 0) {
      saveAs(new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' }), `${Date.now()}.txt`);
    }
    
  }

}
