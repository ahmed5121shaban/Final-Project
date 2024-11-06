export interface Complaint {
    id: number;
    reason: string;
    sellerName: string;
    buyerName: string;
    selleremail : string;
    buyeremail : string;  
  }
  export interface ComplaintResponse {
    list: Complaint[];
    totalCount: number;
    pageSize: number;
  }
    