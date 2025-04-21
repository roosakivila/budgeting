# 📊 Budgeting App – Project Plan

## 🧠 Overview

A simple, user-friendly web-based budgeting app built with React and TypeScript. The app will help users track their income and expenses, categorize their spending, set budgets, and visualize their financial data through charts and analytics. Initially built for personal use, with a focus on clean UI, simplicity, and future extensibility.

---

## 🔑 Key Features

### ✅ Income & Expense Tracking
- [x] Add income amounts
- [x] Add multiple expenses
- [x] Categorize expenses (Rent, Bills, Hobbies, Groceries, etc.)
- [x] View list of added expenses
- [ ] View total expenses wihtout categories

### ✅ Budget Management
- [ ] Set monthly budget per category
- [ ] Set daily budgets (optional or stretch feature)
- [ ] Display how much budget remains in each category

### ✅ Spending Analytics & Visualization (💡 **Priority Feature**)
- [ ] Show income vs. expenses comparison
- [ ] Display category-wise spending breakdown (pie/bar charts)
- [ ] Show trend over time (optional: line chart per category)
- [ ] Responsive and interactive charts

### 🚀 Future Enhancements (Planned Later)
- [ ] Firebase or Node.js backend to persist data
- [ ] User authentication and login
- [ ] Save individual user budgets and expense history
- [ ] Export reports (CSV or PDF)

---

## 🛠️ Technology Stack

| Purpose              | Technology           |
|----------------------|----------------------|
| Frontend Framework   | React + TypeScript   |
| UI Components        | MUI (Material UI)    |
| State Management     | React Hooks          |
| Charts               | Chart.js / Recharts  |
| Backend (Future)     | Firebase / Node.js   |
| Styling              | CSS-in-JS (MUI sx)   |

---

## 📅 Development Plan

### 📍 Phase 1: Basic UI with React + TypeScript
**Goal:** Create the basic components for the app and wire them up with `useState`.

- [x] Set up React project with Vite and TypeScript
- [x] Install and configure MUI
- [x] Build `IncomeForm` component
  - [x] Input for income
  - [x] Submit income
- [x] Build `ExpenseForm` component
  - [x] Input for expense amount
  - [x] Dropdown for category selection
  - [x] List logged expenses
- [x] Display income and expenses on screen

### 📍 Phase 2: State Management & Budget Logic
**Goal:** Store and manage app state for budgets, incomes, and expenses.

- [x] Create a context or global state for all finances
- [x] Implement logic to track category totals
- [ ] Implement budget limit logic
  - [ ] Show warning if category budget is exceeded
- [ ] Optional: Ability to remove/edit expenses
- [ ] Expenses in ag-grid

### 📍 Phase 3: Charts & Analytics
**Goal:** Add chart visualizations to make data easy to understand.

- [x] Install and set up Recharts or Chart.js
- [x] Build pie chart for category spending breakdown
- [ ] Build bar chart comparing income vs expenses
- [ ] Optional: Line chart to show spending over time
- [ ] Make chart components reusable and dynamic

### 📍 Phase 4: Data Persistence (Future Phase)
**Goal:** Store and retrieve data so that it persists between sessions.

- [ ] Connect to Firebase Firestore or another backend
- [ ] Store incomes and expenses
- [ ] Fetch data on app load
- [ ] Add loading states and error handling

---

## 📌 Features To Track During Dev

| Feature                     | Status   |
|-----------------------------|----------|
| Income Input                | ✅ Basic working form |
| Expense Logging             | ✅ Logging works |
| Category Filtering          | 🔲 Planned |
| Chart Integration           | 🔲 High Priority |
| Budget Warnings             | 🔲 Planned |
| Persistent Data             | 🔲 Future |
| User Authentication         | 🔲 Future |
| Responsive UI               | 🔲 In Progress |

---

## 🎯 Final Goal

Build a beautiful, clean, and highly usable budgeting app that **doesn’t just track numbers**, but makes them **visually meaningful**. The goal is to help users clearly understand their finances at a glance, using a friendly UI and helpful insights.

---

## 📂 Folder Structure (Proposed)

