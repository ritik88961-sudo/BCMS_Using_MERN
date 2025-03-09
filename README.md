# 🏢 Business Collaboration Management System (MERN Stack)  

🚀 **A role-based access management system for Sales, Purchase, and HR departments with real-time chat, reports, and secure authentication.**  

## 📌 Features  

### 🔐 **Authentication & Security**  
- JWT-based authentication (Login, Register, Role-Based Access)  
- Auto-delete chat for security (Real-time using Socket.io)  
- Secure document sharing  

### 🎯 **Role-Based Access Control**  
👨‍💼 **Admin**: Full access (Users, Reports, Sales, Purchases, HR, etc.)  
🛒 **Sales Manager**: Sales reports (Google Charts), record sales, manage customers, chat with active users  
📦 **Purchase Manager**: Manage purchases, suppliers, and reports (Google Charts), chat with active users  
👥 **HR Manager**: Employee management, attendance tracking, training assignments, job posting, chat with employees  
👨‍💻 **Employees**: View assigned tasks, attendance, training progress, and communicate with their department  

### 📊 **Reports & Dashboards**  
- Sales, Purchase, Profit & Loss (Google Charts)  
- HR Dashboard (Attendance, Training, Task Reports)  
- Department-wise analytics  

### 💬 **Real-Time Chat**  
- Secure chat within respective departments (Socket.io)  
- Messages auto-delete upon disconnection  

### 📂 **Modules & Management**  
- **Sales Module**: Track sold items, manage customers  
- **Purchase Module**: Manage purchases and suppliers  
- **HR Module**: Employee attendance, training & development  
- **Task Management**: Assign & track department-specific tasks  

## 🛠️ Tech Stack  

| Stack        | Technologies Used |
|-------------|-----------------|
| **Frontend** | React.js, Redux, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Real-time** | Socket.io |
| **Authentication** | JWT (JSON Web Tokens) |

## 📌 System Architecture  

```mermaid
graph TD;
    Frontend -->|REST API| Backend;
    Backend -->|Database Access| Database;
    Backend -->|Real-Time| SocketIO;
    Backend -->|Security| JWT;
    Backend --> Reports;
    Database -->|Stores Data| Users & Transactions;
    Reports -->|Uses Data| Google_Charts;
