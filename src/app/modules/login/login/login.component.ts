import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  isLogged = false;
  sendPoints = false;
  forgetPassword = false;
  passwordEmail: string = '';
  isAdmin = false;
  isUser = false;
  returnUrl: string = '';

  constructor(
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.subscription.push(
      this.authSvc.isLogged.subscribe( (res: any) => {
        this.isLogged = res;
        if(this.isLogged) {
          this.navigateUser();
        }
      })
    );

   }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  navigateUser(): any {
    this.router.navigate(['/user']);
  }

  onLogin(): void {
    const formValue = this.loginForm.value;

    this.subscription.push(
      this.authSvc.login(formValue).subscribe( (res: any) => {
        if (res) {
          this.navigateUser();
        }
      }, (err: any) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err,
        });
      })
    );

  }

}
