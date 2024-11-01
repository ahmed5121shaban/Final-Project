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
  role!: string;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.builder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [""],
    });
    this.form.get('password')!.valueChanges.subscribe(value => {
      this.passwordInputNotEmpty = value.length > 0;
    });
    this.authService.roleSubject.subscribe({
      next:(roles)=>{
        console.log("userroles",roles);
        this.role = roles.find(role=>role==="Admin") || "";
        console.log("isadmin?",this.role);
        
      },
      error:err=>{
        console.log(err);
        
      }
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
    debugger;
    this.authService.loginUser(this.form.value).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.cookieService.set('token', response.token, 2);
          this.toastr.success('Logged in successfully', 'Success');
          this.authService.isLoggedUserSubject.next(true);
          
          const userRole = this.authService.getUserRoleFromToken(response.token);
          if (userRole.includes("Admin")) {
            this.router.navigate(['/admin/home']);
          } else {
            this.location.back();
          }
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
