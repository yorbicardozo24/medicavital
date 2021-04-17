import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.API_URL}/register`, data,
      );
  }

  sendEmail(email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/forget-password`, { email });
  }

  sendCode(code: number, email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/forget-password-code`, {code, email});
  }

  sendNewPassword(email: string, code: number, password: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/change-forget-password`, {email, code, password});
  }

  activateUser(code: number, email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/activate-user-code`, {code, email});
  }

}
