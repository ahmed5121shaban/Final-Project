import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  form:FormGroup
  constructor(private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({

      fname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.email]],
      aStreet:['',[Validators.required]],
      aPostalCode:['',[Validators.required]],
      aCity:['',[Validators.required]],
      aCountry:['',[Validators.required]],
      aTimeZone:['',[Validators.required]],
      aCurrency:['',[Validators.required]],
      firstPhNum:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      secondPhNum:['',[]],

    })
   }

   get fname(){return this.form.get('fname')}
   get lname(){return this.form.get('lname')}
   get email(){return this.form.get('email')}
   get aStreet(){return this.form.get('aStreet')}
   get aPostalCode(){return this.form.get('aPostalCode')}
   get aCity(){return this.form.get('aCity')}
   get aCountry(){return this.form.get('aCountry')}
   get aTimeZone(){return this.form.get('aTimeZone')}
   get aCurrency(){return this.form.get('aCurrency')}
   get firstPhNum(){return this.form.get('firstPhNum')}
   get secondPhNum(){return this.form.get('secondPhNum')}

  ngOnInit() {
    this.form.patchValue({/* data-base-value */})
  }

  editProfile(){
    console.log(this.form.value);
  }

}
