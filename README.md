# PayQuick - Digital Payments Dashboard

A simple but functional frontend ReactJS application for a digital payments dashboard built according to the project requirements. This application demonstrates React component design, Redux state management, authentication, and UI/UX best practices.

## 🚀 Core Features

- **Login Page**: Username/password authentication with form validation
- **Protected Dashboard**: Accessible only with valid authentication
- **Transaction Display**: List of user transactions with amount formatting
- **Profile Information**: User name and email display
- **Logout Functionality**: Clears state and redirects to login
- **State Management**: Redux Toolkit for global state
- **Route Protection**: React Router with authentication guards
- **Mock API**: JSON Server for backend simulation

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 4.1.11
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Mock API**: JSON Server
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Johnsonojo/payquick.git
   cd payquick
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development environment**

   ```bash
   npm run start:dev
   ```

   This command runs both the mock API server (port 3001) and the React development server (port 5173) concurrently.

4. **Alternative: Run servers separately**

   ```bash
   # Terminal 1 - Mock API
   npm run mock-api

   # Terminal 2 - React App
   npm run dev
   ```

## 🎮 Demo Credentials

Use these credentials to test the application:

| Username | Password    | Name           | Email                      |
| -------- | ----------- | -------------- | -------------------------- |
| payquick | password123 | Payquick Owner | payquick.owner@example.com |

## 🏗️ Project Structure

```
payquick/
├── src/
│   ├── features/                    # Feature-based organization
│   │   ├── auth/                    # Authentication feature
│   │   │   ├── api/authApi.js       # Auth API calls
│   │   │   ├── slice/authSlice.js   # Auth Redux slice
│   │   │   └── pages/LoginPage.jsx  # Login page component
│   │   └── transactions/            # Transactions feature
│   │       ├── api/transactionsApi.js # Transaction API calls
│   │       ├── slice/transactionsSlice.js # Transactions Redux slice
│   │       ├── components/          # Transaction components
│   │       │   ├── StatsCards.jsx   # Statistics cards component
│   │       │   └── TransactionTable.jsx # Transaction table component
│   │       └── pages/DashboardPage.jsx # Dashboard page component
│   ├── components/
│   │   └── layout/ProtectedRoute.jsx # Route protection component
│   ├── shared/                      # Shared utilities and configurations
│   │   ├── api/baseAxios.js         # Axios base configuration
│   │   ├── constants/               # Application constants
│   │   │   ├── api.js               # API endpoints
│   │   │   └── app.js               # App constants
│   │   ├── utils/                   # Utility functions
│   │   │   ├── auth.js              # Authentication utilities
│   │   │   └── formatters.js        # Data formatting utilities
│   │   └── hooks/                   # Custom React hooks
│   │       ├── useAuth.js           # Authentication hook
│   │       └── useTransactions.js   # Transactions hook
│   ├── store/                       # Redux store configuration
│   │   ├── store.js                 # Store configuration
│   │   └── rootReducer.js           # Root reducer
│   ├── App.jsx                      # Main app component with routing
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Global styles
├── db.json                          # Mock database for JSON Server
└── package.json                     # Dependencies and scripts
```

## 🔐 Authentication Flow

1. **Login Process**:

   - User enters username and password
   - Form validation using Zod schema
   - Mock API authentication against user database
   - Success: token and user data stored in Redux and localStorage
   - Automatic redirect to dashboard

2. **Protected Routes**:

   - Dashboard access requires valid authentication
   - Unauthenticated users redirected to login
   - Authentication state persists across sessions

3. **Logout Process**:
   - Clears Redux state and localStorage
   - Redirects to login page

## 🎨 UI/UX Features

- **Modern Design**: Beautiful gradient backgrounds and rounded cards
- **Icon Integration**: Lucide React icons throughout the interface
- **Responsive Design**: Tailwind CSS for mobile-first responsive design
- **Loading States**: Elegant loading spinners
- **Form Validation**: Real-time validation with helpful error messages
- **Professional Styling**: Clean, modern interface with consistent design

## 📊 Dashboard Features

- **Statistics Cards**: Balance, income, and expenses with icons
- **User Profile Header**: User information and logout functionality
- **Balance Calculation**: Real-time balance calculation from transactions
- **Transaction Table**: Modern table design with hover effects
- **Transaction Categorization**: Visual distinction between income/expenses
- **Amount Formatting**: Currency formatting with proper signs and colors

## 💾 State Management

The application uses Redux Toolkit with feature-based organization:

- **Auth Slice**: User authentication, login status, and user data
- **Transactions Slice**: Transaction data and loading states
- **Custom Hooks**: Clean component integration (`useAuth`, `useTransactions`)
- **Utility Functions**: localStorage management and formatting

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run mock-api` - Start JSON Server mock API (port 3001)
- `npm run start:dev` - Start both servers concurrently

## 🌐 API Endpoints

Mock API endpoints:

- `GET /users` - User authentication data
- `GET /transactions` - Transaction data

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Mock API: http://localhost:3001

## 📄 License

This project is licensed under the MIT License.

<!-- Author -->

## 👤 Author

[Johnson Ojo](https://github.com/Johnsonojo)
