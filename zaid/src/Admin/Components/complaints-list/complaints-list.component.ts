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
  allComplaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  currentPageComplaints: Complaint[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  sortType: SortType = SortType.single;

  constructor(private fb: FormBuilder, private complaintService: ComplaintService) {
    this.searchForm = this.fb.group({
      reason: [''],
      sellerName: [''],
      buyerName: [''],
      selleremail: [''],
      buyeremail: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllComplaints();

    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadAllComplaints(): void {
    this.complaintService.getComplaints(1, {}).subscribe(response => {
      this.allComplaints = response.list;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { reason, sellerName, buyerName, selleremail, buyeremail } = this.searchForm.value;

    this.filteredComplaints = this.allComplaints.filter(complaint =>
      (reason ? complaint.reason.toLowerCase().includes(reason.toLowerCase()) : true) &&
      (sellerName ? complaint.sellerName.toLowerCase().includes(sellerName.toLowerCase()) : true) &&
      (buyerName ? complaint.buyerName.toLowerCase().includes(buyerName.toLowerCase()) : true) &&
      (selleremail ? complaint.selleremail.toLowerCase().includes(selleremail.toLowerCase()) : true) &&
      (buyeremail ? complaint.buyeremail.toLowerCase().includes(buyeremail.toLowerCase()) : true)
    );

    this.updatePagination();
  }

  onSort(event: any): void {
    const sortProp = event.column.prop as keyof Complaint;
    const sortDir = event.newValue;

    this.filteredComplaints.sort((a, b) => {
      if (a[sortProp] < b[sortProp]) return sortDir === 'asc' ? -1 : 1;
      if (a[sortProp] > b[sortProp]) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.currentPageComplaints = this.filteredComplaints.slice(startIndex, endIndex);
    }
  }
}
