# Inventory Management and Sales Dashboard System

This project is an **Angular-based Inventory Management and Sales Dashboard System** that enables users to manage items, roles, and users; track sales data; and handle item transactions. It is designed using the **MVC pattern** and simulates real-world API interactions using local storage with delayed observable responses.

# Live Link
<https://inventory-sales-system.netlify.app>

---

## 🛠️ Technologies Used

- **Angular**
- **TypeScript**
- **Pure CSS**
- **Bootstrap**
- **LocalStorage (for data persistence)**

---

## ✅ Features

### User Management (Admin Access Only)
- Create, Read, Update, Delete users

### Role Management (Admin Access Only)
- Create, Read, Update, Delete roles

### Item Management (Admin & Supervisor Access)
- Create, Read, Update, Delete items

### Dashboard (Admin & Supervisor Access)
- View total items sold
- View items sold today
- View most popular item
- View Total Sales Amount

### Sales System (Admin & Salesperson Access)
- Sell item (if available in inventory)
- Restock items
- Search items by name/category

---

## ⚙️ API Service Specifications

- **Data Source**: Local Storage
- **API Calls**: Simulated using `RxJS` Observables with 500ms - 2500ms random delay
- **Data Manipulation**: Handled within respective models for separation of concerns

---

## 🚀 Getting Started

### Prerequisites
- Node.js and Angular CLI installed

### Setup
```bash
git clone <https://github.com/mantu1738/inventory-sales-system.git>
cd inventory-management-system
npm install
ng serve

