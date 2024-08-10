import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paypalForm:FormGroup;
  stripeForm :FormGroup
  constructor(private formBuilder:FormBuilder) {

    this.paypalForm = this.formBuilder.group({
      paypalEmail:['',[Validators.required,Validators.email]],
    })

    this.stripeForm = this.formBuilder.group({
      stripeEmail:['',[Validators.required,Validators.email]],
      stripeAPIKey:['',[Validators.required]]
    })

  }

  get paypalEmail(){
    return this.paypalForm.get('paypalEmail')
  }

  get stripeEmail(){
    return this.stripeForm.get('stripeEmail')
  }

  get stripeAPIKey(){
    return this.stripeForm.get('stripeAPIKey')
  }

  stripeSubmit(){}

  paypalSubmit(){}

  ngOnInit() {
  }

}
