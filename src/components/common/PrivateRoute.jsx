// src/components/common/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Assuming you store user info in localStorage after login
        if (user) {
            setIsAuthenticated(true);
            setUserRole(user.role); // Set the role from the logged-in user data
        }
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (userRole !== role) {
        return <Navigate to="/" replace />;
    }

    return children; // Render the child components (e.g., AdminPage, EmployeePage)
};

export default PrivateRoute;
