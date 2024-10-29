import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../Services/profile.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-profile-review',
  templateUrl: './profile-review.component.html',
  styleUrls: ['./profile-review.component.css']
})
export class ProfileReviewComponent implements OnInit {
  id!: string; // استخدام نفس اسم المتغير ليكون مطابقًا لما تم تمريره
  sellerProfile: any;
  buyerProfile: any;
  radius = 100;
  outerStrokeWidth = 10;
  innerStrokeWidth = 10;
  outerStrokeColor = "#6c59f7";
  innerStrokeColor =" #e6e6e6";
  animation = true;
  animationDuration = 300;
  titleColor = '#000000';
  subtitleColor = '#000000';
  apiUrl = environment.apiUrl; 
  constructor(private route: ActivatedRoute, private profileService: ProfileService,) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
        this.getProfiles();
    } else {
        console.error("User ID is missing from the URL.");
    }
    
}
  

  getProfiles() { 
    console.log('Fetching profiles for ID:', this.id);
    this.profileService.getSellerProfile(this.id).subscribe(profile => {
      this.sellerProfile = profile;
      console.log('Seller Profile:', this.sellerProfile);
      if (this.sellerProfile?.items) {
        this.sellerProfile.items.forEach((item: { id: number; name: string; category: string; status: string; images: string[]; }) => {
          console.log('Item Images:', item.images);
          this.sellerProfile.imageUrl = this.sellerProfile?.imageUrl?.replace(/\\/g, '/');
          this.buyerProfile.imageUrl = this.buyerProfile?.imageUrl?.replace(/\\/g, '/');
        });
      }
    }, error => {
      console.error('Error fetching seller profile:', error);
      // يمكنك هنا إظهار إشعار أو رسالة للمستخدم
    });
  
    this.profileService.getBuyerProfile(this.id).subscribe(profile => {
      this.buyerProfile = profile;
      console.log('Buyer Profile:', this.buyerProfile);
    }, error => {
      console.error('Error fetching buyer profile:', error);
      // يمكنك هنا إظهار إشعار أو رسالة للمستخدم
    });
  }

  getSubtitle(percent: number): string {
    return `${percent}%`;
  }
  
}
