import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import EditAccount from './components/EditAccount';
import EditTransaction from './components/EditTransaction';
import EditBudget from './components/EditBudget';
import ReportPage from './components/ReportPage';
import ReportAccounts from './components/ReportAccounts';
import ReportTransactions from './components/ReportTransactions';
import ReportBudget from './components/ReportBudget';


const App = () => {
  return (
    <UserProvider> {/* Wrap the Router with UserProvider */}
      <Router>
        <div style={{ backgroundColor: "black", color: "white", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-account" element={<EditAccount />} />
            <Route path="/edit-transaction" element={<EditTransaction />} />
            <Route path="/edit-budget" element={<EditBudget />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/report-accounts" element={<ReportAccounts />} />
            <Route path="/report-transactions" element={<ReportTransactions />} />
            <Route path="/report-budget" element={<ReportBudget />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
