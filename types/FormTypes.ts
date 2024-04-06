export interface FormData {
    firstName: string
    lastName: string
    birthdate: string
    gender: string
    address: string
    email: string
    contactNumber: string
    password: string
  }
  
export interface FormErrors {
    [key: string]: string
  }