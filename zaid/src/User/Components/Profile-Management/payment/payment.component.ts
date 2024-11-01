import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../../Action/Services/payment.service';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr'
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paypalForm:FormGroup;
  stripeForm :FormGroup;
  stripe!:string;
  paypal!:string;
  hubConnection!:signalR.HubConnection
  constructor(private formBuilder:FormBuilder,private paymentService:PaymentService,private toastr:ToastrService
    ,private location : Location
  ) {

    this.paypalForm = this.formBuilder.group({
      paypalEmail:['',[Validators.required,Validators.email]],
    })

    this.stripeForm = this.formBuilder.group({
      stripeEmail:['',[Validators.required,Validators.email]],
    })


  }

  ngOnInit() {
    this.paymentService.getPaymentEmail().subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res[0].paypalEmail!=null)
          this.paypal = res[0].paypalEmail
        if(res[0].stripeEmail!=null)
          this.stripe = res[0].stripeEmail
        console.log(this.stripe,this.paypal);
        console.log(res[0].paypalEmail,res[0].stripeEmail);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }



  get paypalEmail(){
    return this.paypalForm.get('paypalEmail')
  }

  get stripeEmail(){
    return this.stripeForm.get('stripeEmail')
  }

  stripeSubmit(){
    this.paymentService.addPaymentEmail({stripeEmail:this.stripeEmail?.value,Method:1}).subscribe(
      {
        next:(res)=>{console.log(res);this.toastr.success("The Email Added Successfully");this.location.back()},
        error:(err)=>{console.error(err);this.toastr.error("The Email Not Added")}
      }
    )
  }

  paypalSubmit(){
    this.paymentService.addPaymentEmail({paypalEmail:this.paypalEmail?.value,Method:0})
    .subscribe(
      {
        next:(res)=>{console.log(res);this.toastr.success("The Email Added Successfully");this.location.back()},
        error:(err)=>{console.error(err);this.toastr.error("The Email Not Added")}
      }
    )
  }


  openConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/profileHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        this.hubConnection.on('paypalEmail',(res)=>{
          this.paypal = res;
        });
        this.hubConnection.on('stripeEmail',(res)=>{
          this.stripe = res;
        });
      })
      .catch((err) => {
        console.log('SignalR Connection Error: ', err);
        this.toastr.error(err);
      });

  }
}
