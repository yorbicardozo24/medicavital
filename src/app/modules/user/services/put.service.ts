import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }

  putProgramming(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/put/programming`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  putDelivery(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/put/delivery`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  putDeliveryReport(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/put/delivery-report`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

  putBilling(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/user/put/billing`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')!).userToken}) }
      );
  }

}
