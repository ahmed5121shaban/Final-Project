export interface Complaint {
    id: number;
    reason: string;
    sellerName: string;
    buyerName: string;
    dateSubmitted: Date;
  }
  export interface ComplaintResponse {
    list: Complaint[];
    totalCount: number;
    pageSize: number;
  }
    