import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interface/auth';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  form: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.form = this.builder.group({
      password: ["", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)
      ]],
      confirmPassword: ["", [
        Validators.required,
      ]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }

  updatePassword() {
    if (this.form.invalid) {
      this.toastr.error('Please correct the errors in the form.', 'Error');
      return;
    }


  const { password } = this.form.value;
  const email = sessionStorage.getItem('email'); // Get email from sessionStorage

  if (email) {
    this.authService.updateUserPassword(email, password).subscribe({
      next: (success) => {
        if (success) {
          this.toastr.success('Password updated successfully');
          this.router.navigate(['/user/login']);
        } else {
          this.toastr.error('Email not found', 'Error');
        }
      },
      error: (err) => {
        console.error('Error updating password:', err);
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  } else {
    this.toastr.error('No email found in session', 'Error');
  }
}
}
