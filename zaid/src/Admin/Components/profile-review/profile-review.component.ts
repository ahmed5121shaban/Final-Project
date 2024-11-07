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
  searchText: string = ''; 
  sortDirection: string = 'asc';
  currentPage: number = 1;
  buyerSearchText: string = '';
  buyerCurrentPage: number = 1;
  sellerCurrentPage: number = 1;

  id!: string;
  sellerProfile: any;
  buyerProfile: any;


  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
        this.getProfiles();
    } else {
        console.error("User ID is missing from the URL.");
    }

  }
  get totalBuyerPages(): number {
    return Math.ceil(this.filteredBuyerItems.length / 5); // حساب إجمالي الصفحات للمشتري
  }
  get totalSellerPages(): number {
    return Math.ceil(this.filteredSellerItems.length / 5); // حساب إجمالي الصفحات
  }
  sortItems(field: string): void {
    console.log('Items before sorting:', this.sellerProfile.items); // لمتابعة القيم
    this.sellerProfile.items.sort((a: any, b: any) => {
        const valueA = a[field].toLowerCase(); // تحويل القيمة إلى حروف صغيرة لتجنب مشاكل الحالة
        const valueB = b[field].toLowerCase();

        if (this.sortDirection === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueB > valueA ? 1 : -1;
        }
    });

    // عكس اتجاه الترتيب
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
}


  sortBuyerAuctions(field: string): void {
    
    this.buyerProfile.auctions.sort((a: any, b: any) => {
        let valueA: any;
        let valueB: any;

        // تحديد القيمة بناءً على الحقل المطلوب
        if (field === 'name') {
            valueA = a.item.name;
            valueB = b.item.name;
        } else if (field === 'sellerName') {
            valueA = a.item.sellerName;
            valueB = b.item.sellerName;
        } else if (field === 'startDate') {
            valueA = new Date(a.startDate).getTime(); // تحويل التاريخ إلى وقت
            valueB = new Date(b.startDate).getTime();
        } else if (field === 'endDate') {
            valueA = new Date(a.endDate).getTime(); // تحويل التاريخ إلى وقت
            valueB = new Date(b.endDate).getTime();
        }

        // تطبيق الترتيب
        if (this.sortDirection === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueB > valueA ? 1 : -1;
        }
    });

    // عكس اتجاه الترتيب
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
}


get filteredSellerItems() {
  const filteredItems = this.sellerProfile?.items?.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(this.searchText.toLowerCase()) 
  ) || [];

  return filteredItems;
}


  get filteredBuyerItems() {
    return this.buyerProfile?.auctions?.filter((auction: any) =>
      auction.item.name.toLowerCase().includes(this.buyerSearchText.toLowerCase())
    ) || [];
  }

  getProfiles() { 
    this.profileService.getSellerProfile(this.id).subscribe(profile => {
      this.sellerProfile = profile;
      // this.sellerProfile.imageUrl = this.sellerProfile?.imageUrl?.replace(/\\/g, '/').replace(/ /g, '%20');
    }, error => {
      console.error('Error fetching seller profile:', error);
    });
  
    this.profileService.getBuyerProfile(this.id).subscribe(profile => {
      this.buyerProfile = profile;
      // this.buyerProfile.imageUrl = this.buyerProfile?.imageUrl?.replace(/\\/g, '/').replace(/ /g, '%20');
      console.log('Buyer Profile Data:', this.buyerProfile); // عرض بيانات المشتري في الكونسول
    }, error => {
      console.error('Error fetching buyer profile:', error);
    });
  }
 

  

  getSubtitle(percent: number): string {
    return `${percent}%`;
  }
  
}
