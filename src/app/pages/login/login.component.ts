import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface signupForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  toastService: any;
    
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    }

    submit(){
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => this.toastr.success("Login feito com sucesso!"),
        error: () => this.toastr.error("Erro inesperado! Tente novamente."),
      })
    }

    navigate(){
      this.router.navigate(["signup"])
    }
}
