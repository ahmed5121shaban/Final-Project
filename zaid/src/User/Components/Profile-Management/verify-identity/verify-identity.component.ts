import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {
  form:FormGroup
  constructor(private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({

      fname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
      lname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
      dateOfBarth:['',[Validators.required]],
      idNumber:['',[Validators.required]],
      idDocument:['',[Validators.required]],
      deliveryDesc:['',[]]

    })
   }

   get fname(){return this.form.get('fname')}
   get lname(){return this.form.get('lname')}
   get dateOfBarth(){return this.form.get('dateOfBarth')}
   get idNumber(){return this.form.get('idNumber')}
   get idDocument(){return this.form.get('idDocument')}
   get deliveryDesc(){return this.form.get('deliveryDesc')}


  ngOnInit() {
  }

  addID(){
    console.log(this.form.value);
  }
}
