// src/components/common/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Online Leave Management</Typography>
                <div>
                    <Button color="inherit" onClick={() => navigate('/login?role=admin')}>
                        Admin Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/login?role=employee')}>
                        Employee Login
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
