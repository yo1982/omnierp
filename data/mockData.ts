import type { Product, Employee, Customer, PurchaseOrder, JournalEntry } from '../types';

export const products: Product[] = [
  { id: '1', name: 'Espresso', category: 'Coffee', price: 2.50, stock: 100, imageUrl: 'https://picsum.photos/seed/espresso/200' },
  { id: '2', name: 'Latte', category: 'Coffee', price: 3.50, stock: 80, imageUrl: 'https://picsum.photos/seed/latte/200' },
  { id: '3', name: 'Croissant', category: 'Pastries', price: 2.75, stock: 50, imageUrl: 'https://picsum.photos/seed/croissant/200' },
  { id: '4', name: 'Cheeseburger', category: 'Meals', price: 8.99, stock: 40, imageUrl: 'https://picsum.photos/seed/burger/200' },
  { id: '5', name: 'Caesar Salad', category: 'Meals', price: 7.50, stock: 30, imageUrl: 'https://picsum.photos/seed/salad/200' },
  { id: '6', name: 'T-Shirt', category: 'Clothing', price: 19.99, stock: 120, imageUrl: 'https://picsum.photos/seed/tshirt/200' },
  { id: '7', name: 'Spark Plug', category: 'Auto Parts', price: 4.50, stock: 200, imageUrl: 'https://picsum.photos/seed/sparkplug/200' },
  { id: '8', name: 'Carrots', category: 'Groceries', price: 1.20, stock: 150, imageUrl: 'https://picsum.photos/seed/carrots/200' },
  { id: '9', name: 'Dry Clean - Shirt', category: 'Services', price: 3.00, stock: 999, imageUrl: 'https://picsum.photos/seed/shirtclean/200' },
  { id: '10', name: 'Haircut', category: 'Services', price: 25.00, stock: 999, imageUrl: 'https://picsum.photos/seed/haircut/200' },
];

export const employees: Employee[] = [
  { id: 'e1', name: 'John Doe', role: 'Manager', email: 'john@example.com', phone: '123-456-7890', salary: 75000, hireDate: '2022-01-15' },
  { id: 'e2', name: 'Jane Smith', role: 'Cashier', email: 'jane@example.com', phone: '123-456-7891', salary: 45000, hireDate: '2022-03-20' },
  { id: 'e3', name: 'Mike Johnson', role: 'Chef', email: 'mike@example.com', phone: '123-456-7892', salary: 60000, hireDate: '2023-05-10' },
  { id: 'e4', name: 'Emily Davis', role: 'Stylist', email: 'emily@example.com', phone: '123-456-7893', salary: 52000, hireDate: '2023-02-01' },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Alice Williams', email: 'alice@example.com', phone: '987-654-3210', loyaltyPoints: 125, joinDate: '2023-01-05' },
  { id: 'c2', name: 'Bob Brown', email: 'bob@example.com', phone: '987-654-3211', loyaltyPoints: 75, joinDate: '2023-04-12' },
  { id: 'c3', name: 'Charlie Green', email: 'charlie@example.com', phone: '987-654-3212', loyaltyPoints: 210, joinDate: '2022-11-30' },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-001', supplier: 'Global Food Supplies', date: '2024-07-20', status: 'Completed', total: 1250.75, itemCount: 15 },
  { id: 'PO-002', supplier: 'Textile Innovators', date: '2024-07-22', status: 'Pending', total: 3500.00, itemCount: 5 },
  { id: 'PO-003', supplier: 'Auto Parts Direct', date: '2024-07-18', status: 'Completed', total: 850.20, itemCount: 32 },
  { id: 'PO-004', supplier: 'Fresh Farm Produce', date: '2024-07-23', status: 'Pending', total: 450.50, itemCount: 25 },
  { id: 'PO-005', supplier: 'Cleaning Solutions Inc.', date: '2024-06-30', status: 'Cancelled', total: 600.00, itemCount: 10 },
];

export const journalEntries: JournalEntry[] = [
    { id: 't1', date: '2024-07-25', account: 'Cash', description: 'Initial cash investment', debit: 50000, credit: 0 },
    { id: 't2', date: '2024-07-25', account: 'Common Stock', description: 'Initial cash investment', debit: 0, credit: 50000 },
    { id: 't3', date: '2024-07-26', account: 'Rent Expense', description: 'Paid July rent', debit: 2000, credit: 0 },
    { id: 't4', date: '2024-07-26', account: 'Cash', description: 'Paid July rent', debit: 0, credit: 2000 },
    { id: 't5', date: '2024-07-27', account: 'Sales Revenue', description: 'Daily sales', debit: 0, credit: 3500 },
    { id: 't6', date: '2024-07-27', account: 'Cash', description: 'Daily sales', debit: 3500, credit: 0 },
    { id: 't7', date: '2024-07-28', account: 'Cost of Goods Sold', description: 'COGS for daily sales', debit: 1500, credit: 0 },
    { id: 't8', date: '2024-07-28', account: 'Inventory', description: 'COGS for daily sales', debit: 0, credit: 1500 },
];