import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-random',
  templateUrl: './code-random.component.html',
  styleUrls: ['./code-random.component.css']
})
export class CodeRandomComponent implements OnInit, OnDestroy {

  @Input() email: string = '';
  private subscription: Subscription[] = [];
  password = '';
  repeatPassword = '';
  codigo!: number;
  codeSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  sendNewPassword(): any {
    if (this.password.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor ingrese su nueva contraseña',
      });
    }
    if (this.repeatPassword.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor repita su nueva contraseña',
      });
    }

    this.subscription.push(
      this.register.sendNewPassword(this.email, this.codigo, this.password).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Bien hecho!',
          text: res.message,
        });
        this.router.navigate(['/login']);
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      })
    );
  }

  sendCode(): any {
    if (this.codigo > 0) {
      this.subscription.push(
        this.register.sendCode(this.codigo, this.email).subscribe((res) => {
          this.codeSent = true;
        })
      );
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor ingrese su código',
      });
    }
  }

}
