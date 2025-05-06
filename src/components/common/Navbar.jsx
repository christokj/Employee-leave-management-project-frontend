// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = ({ role }) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" style={{ flex: 1 }}>
                    Leave Management System
                </Typography>
                {role === 'admin' ? (
                    <>
                        <Button color="inherit" component={Link} to="/admin">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/admin/departments">Departments</Button>
                        <Button color="inherit" component={Link} to="/admin/employees">Employees</Button>
                        <Button color="inherit" component={Link} to="/admin/leave-applications">Leave Applications</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/employee">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/employee/apply-leave">Apply Leave</Button>
                        <Button color="inherit" component={Link} to="/employee/leave-history">Leave History</Button>
                        <Button color="inherit" component={Link} to="/employee/profile">Profile</Button>
                    </>
                )}
                <Button color="inherit" onClick={() => localStorage.removeItem('role') && window.location.reload()}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
