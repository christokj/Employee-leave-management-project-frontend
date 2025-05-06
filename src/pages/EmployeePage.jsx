// src/pages/EmployeePage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import ApplyForLeave from '../components/employee/ApplyForLeave';
import LeaveHistory from '../components/employee/LeaveHistory';
import Profile from '../components/employee/Profile';

const EmployeePage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                <Route path="apply-leave" element={<ApplyForLeave />} />
                <Route path="leave-history" element={<LeaveHistory />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default EmployeePage;
