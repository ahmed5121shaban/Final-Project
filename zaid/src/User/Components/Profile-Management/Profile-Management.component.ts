import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './Profile-Management.component.html',
  styleUrls: ['./Profile-Management.component.css']
})
export class ProfileManagementComponent implements OnInit {
  role: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole(): void {
    this.authService.roleSubject.subscribe({
      next: (roles) => {
        console.log("User roles:", roles);
        this.role = roles.find(role => role == "Seller") || "";
        console.log("Is Seller?", this.role);
      },
      error: (err) => {
        console.log("Error fetching user roles:", err);
      }
    });
  }

  isSeller(): boolean {
    return this.role === "Seller";
  }
}
