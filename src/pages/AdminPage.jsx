// src/pages/AdminPage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import ManageDepartments from '../components/admin/ManageDepartments';
import ManageEmployees from '../components/admin/ManageEmployees';
import ManageLeaveApplications from '../components/admin/ManageLeaveApplications';

const AdminPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="departments" element={<ManageDepartments />} />
                <Route path="employees" element={<ManageEmployees />} />
                <Route path="leave-applications" element={<ManageLeaveApplications />} />
            </Routes>
        </div>
    );
};

export default AdminPage;
