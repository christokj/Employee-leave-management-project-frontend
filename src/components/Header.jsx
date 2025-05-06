// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // Check if the user is logged in by checking localStorage or some authentication method
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Remove the auth token and set login state to false
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        history.push('/login');  // Redirect to login page after logout
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Leave Management</Link>
                    </Typography>

                    <div>
                        {isLoggedIn ? (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleLogout}
                                style={{
                                    marginLeft: '10px',
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                    borderRadius: '25px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/login')}
                                style={{
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                    borderRadius: '25px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    '&:hover': {
                                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
