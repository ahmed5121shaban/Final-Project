import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  form:FormGroup
  constructor(private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({

      name:['',[Validators.required,Validators.minLength(5),Validators.maxLength(40)]],
      address:['',[Validators.required]],
      aPostalCode:['',[Validators.required]],
      aCity:['',[Validators.required]],
      aCountry:['',[Validators.required]],
      aState:['',[Validators.required]],
      deliveryDesc:['',[]]

    })
   }

   get name(){return this.form.get('name')}
   get address(){return this.form.get('address')}
   get aPostalCode(){return this.form.get('aPostalCode')}
   get aCity(){return this.form.get('aCity')}
   get aCountry(){return this.form.get('aCountry')}
   get aState(){return this.form.get('aState')}


  ngOnInit() {
  }

  editShippingDetail(){
    console.log(this.form.value);
  }

}
