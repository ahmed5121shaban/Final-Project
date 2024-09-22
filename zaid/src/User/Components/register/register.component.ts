
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../interface/auth';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.registerForm = this.builder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)
      ]],
      confirmPassword: ["", Validators.required]
    }, { validators: this.passwordMatchValidator }); 
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
  get firstName() {
    return this.registerForm.controls['firstName'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please correct the errors in the form.', 'Error');
      return;
    }

    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.toastr.success('Register successfully', 'Success');
        this.router.navigate(['/user/login']);
      },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong', 'Error');
      }
    );
  }
}