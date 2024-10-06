import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  passwordFieldType: string = 'password';
  passwordInputNotEmpty: boolean = false;
  constructor(private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.form = this.builder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: ["",],
    });
    this.form.get('password')!.valueChanges.subscribe(value => {
      this.passwordInputNotEmpty = value.length > 0;
    });
  }
  get rememberMe(){
    return this.form.controls['rememberMe'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];

  }

  loginUser() {
    this.authService.loginUser(this.form.value).subscribe(
      (response:any) => {
        if (response.status == 200) {
          localStorage.setItem('token', response.token);
          localStorage.setItem("auth",response.token);
          this.router.navigate(['/user/my/profile']);
          this.toastr.success('Logged in successfully', 'Success');
        } else {
          this.toastr.error('Email or password is wrong', 'Error');
        }
      }
    );

  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
