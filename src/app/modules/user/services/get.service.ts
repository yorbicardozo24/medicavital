import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) { }

  getAddressing(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/get/addressing`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  getProgramming(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/get/programming`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  getDelivery(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/get/delivery`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  getDeliveryReport(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/get/delivery-report`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  getBilling(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/get/billing`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

}
