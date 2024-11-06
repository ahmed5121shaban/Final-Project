import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  returnUrl: string;
  form: FormGroup;
  passwordFieldType: string = 'password';
  passwordInputNotEmpty: boolean = false;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private location: Location
  ) {
   /*  if(this.cookieService.get("token")!=''){
      this.toastr.warning("you are already login")
      this.router.navigate(['']);
    } */
    this.form = this.builder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [""],
    });
    this.form.get('password')!.valueChanges.subscribe(value => {
      this.passwordInputNotEmpty = value.length > 0;
    });

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  get rememberMe() {
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
      {next:(response: any) => {
        if (response.status == 200) {
          this.cookieService.delete('token');
          this.cookieService.set('token', response.token);
          this.toastr.success('Logged in successfully', 'Success');
          this.authService.isLoggedUserSubject.next(true);
          this.authService.roleSubject.next(JSON.parse(atob(this.cookieService.get("token").split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
          const userRole = this.authService.getUserRoleFromToken(response.token);
          if (userRole.includes("Admin")) {
            this.router.navigate(['/admin/home']);
          } else {
            this.router.navigate(['/user/profile']);
          }
        } else {
          this.toastr.error('Email or password is wrong', 'Error');
        }
      },error:(err)=>{
        this.toastr.error('Email or password is wrong', 'Error');
      }
  });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
