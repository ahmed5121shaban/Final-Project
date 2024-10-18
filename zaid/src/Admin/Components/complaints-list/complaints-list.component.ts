import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComplaintService } from '../../../User/Services/complaint.service';
import { Complaint } from '../../../User/interface/complaint';
import { SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit {
  searchForm: FormGroup;
  currentPageComplaints: Complaint[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  sortType: SortType = SortType.single;

  constructor(private fb: FormBuilder, private complaintService: ComplaintService) {
    this.searchForm = this.fb.group({
      reason: [''],
      startDate: [''],
      endDate: [''],
      sellerName: [''],
      buyerName: ['']
    });
  }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    const searchValues = this.searchForm.value;
    this.complaintService.getComplaints(this.currentPage, searchValues).subscribe(response => {
      this.currentPageComplaints = response.list;
      this.totalPages = Math.ceil(response.totalCount / response.pageSize);
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    });
  }

  onSort(event: any): void {
    this.sortType = event.newValue;
    this.loadComplaints();
  }

  onPage(event: any): void {
    this.currentPage = event.page;
    this.loadComplaints();
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadComplaints();
    }
  }
}
