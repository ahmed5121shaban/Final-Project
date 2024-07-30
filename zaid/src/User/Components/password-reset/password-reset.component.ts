import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  form: FormGroup;
  constructor(private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.form = this.builder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.controls['email'];
  }
 
  resetPassword() {
    const { email } = this.form.value;
    console.log(email);
  
    this.authService.getUserByEmail(email).subscribe({
      next: (response) => {
        if (response.length > 0) {
          sessionStorage.setItem('email', email);
          this.router.navigate(['/user/new-password']);
          this.toastr.success('An email has been sent');
        } else {
          this.toastr.error('Email is incorrect', 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong. Please try again later.', 'Error');
      }
    });
  }
  


}
