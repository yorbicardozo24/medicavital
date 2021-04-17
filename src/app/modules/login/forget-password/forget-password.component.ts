import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  emailEnviado: boolean = false;
  email: string = '';
  
  constructor(
    private register: RegisterService
  ) { }

  ngOnInit(): void {
    this.emailEnviado = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  onChange(): any {

    if (this.email.trim() != '') {
      this.subscription.push(
        this.register.sendEmail(this.email).subscribe((res) => {
          this.emailEnviado = true;
          return Swal.fire(
            'Bien hecho!',
            'Por favor digita el código que se envió a tu email',
            'success'
          );
        }, (err) => {
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        })
      );
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Datos incompletos',
      });
    }

  }

}
