import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { UserResponse, UserLogin } from '../interfaces/User';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private aRoute: ActivatedRoute) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get isUser(): Observable<boolean>{
    return this.userRole.asObservable();
  }

  login(authData: UserLogin): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/login`, authData)
      .pipe(
        map((res: UserResponse) => {

          const user: UserResponse = {
            token: res.token,
            userId: res.userId,
            userName: res.userName,
            role: res.role
          };

          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn.next(true);
          this.userRole.next(true);
          

          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.userRole.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage === null || userLocalStorage === undefined) {
      return this.logout();
    }else{
      const userToken = JSON.parse(localStorage.getItem('user')!).token;
      const isExpired = helper.isTokenExpired(userToken);

      if (isExpired) {
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.userRole.next(true);
      }
    }

  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';

    if (err) {
      errorMessage = `${err.error.message}`;
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }

}

