export type Page = 
  | 'Dashboard' 
  | 'Point of Sale' 
  | 'Inventory' 
  | 'Human Resources' 
  | 'CRM' 
  | 'Purchasing' 
  | 'Accounting' 
  | 'Settings';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  salary: number;
  hireDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  joinDate: string;
}

export interface PurchaseOrder {
    id: string;
    supplier: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
    total: number;
    itemCount: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}