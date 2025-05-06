import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<AdminPage />} />
        </Route>

        <Route path="/employee" element={<PrivateRoute role="employee" />}>
          <Route index element={<EmployeePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
