# Workshop Setup Instructions – Student Management System

## 📋 Prerequisites

Before starting the workshop, make sure the following tools are installed and properly set up on your system:

- **Node.js (v18 or above)** – [Download here](https://nodejs.org/)
- **npm** – Comes bundled with Node.js
- **PostgreSQL** – [Download here](https://www.postgresql.org/download/)
- **Git** – [Download here](https://git-scm.com/)
- **VS Code** – [Download here](https://code.visualstudio.com/)
- **Postman** – [Download here](https://www.postman.com/downloads/)

Make sure PostgreSQL is running and accessible. You can use either the command line or pgAdmin for managing the database.

---

## ⚙️ Project Setup

This project is divided into two parts: **frontend** and **backend**.

### 🔀 Fork and Clone the Repository

To keep your work separate and safe, please fork the main GitHub repository before cloning.

1. Go to the main repository link ([shared by the instructor](https://github.com/epcm18/workshop-student-management.git)).
2. Click **“Fork”** (top-right corner of the GitHub page).
3. This will create a copy of the project in your own GitHub account.
4. Go to your repo in your github account.

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

---

## 🧱 Running the Project

### Start Backend
From the `backend` folder:
```bash
npm run dev
```
This starts the Node.js server (Express + PostgreSQL).

### Start Frontend
Open another terminal, then from the `frontend` folder:
```bash
npm run dev
```
This starts the React application (Vite + Material-UI + Formik).

---

## 🎯 Workshop Objective

The goal of this workshop is to understand how a **frontend React application** communicates with a **backend Node.js + Express API** connected to a **PostgreSQL** database.

You will learn to:
- Install and configure required dependencies.
- Set up a working development environment.
- Understand project structure (frontend & backend).
- Make basic changes in UI components (e.g., button style, table column).
- Validate user inouts using formiks.
- Create Database entitis and relationships.
- Observe how CRUD operations connect from frontend → backend → database.
- Test API endpoints using postman.
- Connect APIs with frontend with axios.

---

Please ensure everything runs correctly before the session begins.




