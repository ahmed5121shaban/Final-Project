import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Location } from '@angular/common';
interface Reply {
  id: number;
  text: string;
}

interface Comment {
  id: number;
  author:string;
  text: string;
  replies: Reply[];
}

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent implements OnChanges {
  paymentCount !: {count : number, payment : string};
  currentSlide = 0;


  constructor(private paymentService:PaymentService,private location:Location) {}

  ngOnChanges(): void {
    this.paymentService.userHavePayment().subscribe(
      (res:any)=>{
        console.log(res.message)
        this.paymentCount.count=res.count;
        this.paymentCount.payment=res.payment;

      }
    )
  }

  itemImages = [
    { src: 'hd_item_3649360_e2ceb54174.jpg'},
    { src: 'hd_item_3649360_e2ceb54174.jpg'},
    { src: 'hd_item_3649360_e2ceb54174.jpg'},
    { src: 'hd_item_3649360_e2ceb54174.jpg'}



    // Add more slides as needed
  ];

  similarAuctions = [
    { title: 'Item Title 1', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$10.00' },
    { title: 'Item Title 2', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$20.00' },
    { title: 'Item Title 3', img: 'hd_item_3649360_e2ceb54174.jpg', price: '$30.00' },
    { title: 'Item Title 4', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$40.00' },
    { title: 'Item Title 5', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$50.00' },
    { title: 'Item Title 6', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$60.00' }
  ];

  ngOnInit(): void {
    this.groupItems();
  }
  //to display 3 sildes
  groupedItems:Array<any> = [];
  groupItems(): void {
    for (let i = 0; i < this.similarAuctions.length; i += 3) {
      this.groupedItems.push(this.similarAuctions.slice(i, i + 3));
    }
  }



  // comments
  comments: Comment[] = [
    { id: 1, text: 'This is a comment from a sara.',author:"sara", replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nermeen.',author:"nermeen",  replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nada.', author:"nada", replies: [{id:2,text:"This is a reply from a buyer."}] }
    // Add more comments if needed
  ];

  payment(){
    this.paymentService.firstPaymentAuction().subscribe({
      next:(res:any)=>{
        console.log(res.status);
        console.log(res.urlCheckOut);
        window.location.href = res.urlCheckOut;
      },
      error:(err)=>{
        console.error("error", err);
      }
    })
  }

}
