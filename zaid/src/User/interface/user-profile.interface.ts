// user-profile.interface.ts

// Define interface for GET data
export interface UserProfileGet {
    FirstName: string;
    LastName: string;
    Email: string;
    TimeZone: string;
    Age: number;
    Gender: string;
    Description: string;
    Currency: string;
    SecondPhoneNumber?: string;
    PhoneNumbers: string[];
    ProfileImage: File | null; // Change here to allow null

  }
  
  // Define interface for EDIT data
 // user-profile.interface.ts

// Define interface for EDIT data
export interface UserProfileEdit {
    FirstName: string;
    LastName: string;
    Email: string;
    Street: string;
    PostalCode: string;
    City: string;
    Country: string;
    TimeZone: string;
    Age: number;
    Gender: string;
    Description: string;
    Currency: string;
    PhoneNumbers: string[];
    ProfileImage: File | null; // Change here to allow null
}
