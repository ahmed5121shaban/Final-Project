// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   registerForm: FormGroup

//   constructor(
//     private router: Router,
//     // private authService: AuthService,
//     // private messageService: MessageService,
//     private builder: FormBuilder
//   ) {
//     this.registerForm = this.builder.group({
//       name: ["", [Validators.required]],
//       email: ["", [Validators.required, Validators.email]],
//       pass: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)]],
//       repPass: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)]]
//     })
//   }
//   send() {
//     console.log(this.registerForm.value);

//   }
//   get fullName() {
//     return this.registerForm.controls['name'];
//   }

//   get email() {
//     return this.registerForm.controls['email'];
//   }
//   get password() {
//     return this.registerForm.controls['password'];
//   }

//   get confirmPassword() {
//     return this.registerForm.controls['confirmPassword'];
//   }

//   // submitDetails() {
//   //   const postData = { ...this.registerForm.value };
//   //   delete postData.confirmPassword;
//   //   this.authService.registerUser(postData as User).subscribe(
//   //     response => {
//   //       console.log(response);
//   //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
//   //       this.router.navigate(['login'])
//   //     },
//   //     error => {
//   //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
//   //     }
//   //   )
//   // }
// }


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
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)
      ]],
      confirmPassword: ["", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)
      ]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  get fullName() {
    return this.registerForm.controls['name'];
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
