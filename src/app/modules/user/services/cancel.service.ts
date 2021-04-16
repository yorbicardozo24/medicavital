import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CancelService {

  constructor(private http: HttpClient) { }

  cancelProgramming(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/cancel/programming`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  cancelDelivery(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/cancel/delivery`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  cancelDeliveryReport(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/cancel/delivery-report`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  cancelBilling(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/cancel/billing`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }
}
