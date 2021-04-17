import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  codeSent: boolean = false;
  code!: number;

  registerForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  activar() {
    if (this.code > 0) {
      this.subscription.push(
        this.register.activateUser(this.code, this.registerForm.value.email).subscribe((res) => {
          return Swal.fire(
            'Bien hecho!',
            'Usuario activado correctamente',
            'success'
          ).then(() => {
            this.router.navigate(['/login']);
          });
        }, (err) => {
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        })
      )
    }
  }

  onRegister(): any {
    const formValue = this.registerForm.value;

    if (
      formValue.name.trim() != '' &&
      formValue.email.trim() != '' &&
      formValue.password.trim() != ''
    ) {
      this.subscription.push(
        this.register.registerUser(formValue).subscribe((res) => {
          this.codeSent = true;
          return Swal.fire(
            'Bien hecho!',
            'Usuario creado correctamente, por favor comunícate con el administrador para activar tu cuenta.',
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
