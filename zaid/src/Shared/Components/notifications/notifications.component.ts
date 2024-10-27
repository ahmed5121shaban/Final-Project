import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  allNotifications!:any
  sliceNumber=4
  constructor(private notificationService : NotificationService,private toaster:ToastrService) {
  }
  ngOnInit() {

      this.notificationService.GetAllNotifications().subscribe({
        next:(res:any)=>{
          this.allNotifications=res.result.reverse()
          console.log(res);
        },
      })
  }
  get slicingNotifications(){
    return this.allNotifications.slice(0,this.sliceNumber);
  }

  moeNotifications(){
    if (this.allNotifications.length<this.sliceNumber) {
      this.toaster.warning("no more notifications");
      return
    }
    this.sliceNumber+=4;
  }

}
