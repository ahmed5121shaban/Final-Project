import { Component } from '@angular/core';
import { ShipmentService } from '../../Services/shipment/shipment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipment-tracking',
  templateUrl: './shipment-tracking.component.html',
  styleUrls: ['./shipment-tracking.component.css']
})
export class ShipmentTrackingComponent {
  shipmentDetails: any; // Define the type based on your expected response
  shipmentId: number = 0;
  selectedStatus: number = 0;

  // Properties to control the progress bar
  progressWidth: string = '0%';
  progressText: string = 'Not Started';
  progressColor: string = '#e9ecef'; 
  textColor: string = '#000';

  constructor(
    private shipmentService: ShipmentService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.shipmentId = +params['id']; // Use the ID from the route
      this.fetchShipmentDetails(this.shipmentId);
    });
  }

  // Fetch shipment details from the backend
  fetchShipmentDetails(id: number): void {
    this.shipmentService.getDetails(id).subscribe({
      next: (data) => {
        this.shipmentDetails = data;
        console.log('Shipment Details:', this.shipmentDetails);
        this.selectedStatus = this.shipmentDetails.status; // Set the selected status
        this.updateProgress(this.selectedStatus); 
      },
      error: (err) => {
        console.error('Error fetching shipment details:', err);
      }
    });
  }

  // Update shipment status on user selection
  updateStatus(): void {
    if (this.selectedStatus < 0) {
      console.error('Please select a status.');
      return;
    }
    this.shipmentService.updateShipmentStatus(this.shipmentId, this.selectedStatus).subscribe({
      next: (response) => {
        console.log(response);
        this.fetchShipmentDetails(this.shipmentId); // Refresh details to get updated status
      },
      error: (err) => {
        console.error('Error updating shipment status:', err);
      }
    });
  }

  // Handle status change event from the dropdown
  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = Number(selectElement.value); 
    this.updateProgress(this.selectedStatus); 
  }

  // Method to update the progress bar based on status
  updateProgress(status: number): void {
    // Convert the status to lower case for easier comparison
    switch (status) {
      case 0:
        this.progressWidth = '100%';
        this.progressText = 'Not Started';
        this.progressColor = '#e9ecef'; 
        this.textColor = '#000';
        break;
      case 1:
        this.progressWidth = '25%';
        this.progressText = 'Pending';
        this.progressColor = '#ffcc00';  // Yellow
        this.textColor = '#000'; // Black text
        break;
      case 2:
        this.progressWidth = '50%';
        this.progressText = 'On The Way';
        this.progressColor = '#17a2b8';  // Blue
        this.textColor = '#fff'; // White text
        break;
      case 3:
        this.progressWidth = '100%';
        this.progressText = 'Delivered';
        this.progressColor = '#28a745';  // Green
        this.textColor = '#fff'; // White text
        break;
      case 4:
        this.progressWidth = '100%';
        this.progressText = 'Returned';
        this.progressColor = '#dc3545';  // Red
        this.textColor = '#fff'; // White text
        break;
      default:
        this.progressWidth = '0%';
        this.progressText = 'Unknown Status';
        this.progressColor = '#6c757d';  // Gray
        this.textColor = '#fff'; // White text
        break;
    }
  }
}
