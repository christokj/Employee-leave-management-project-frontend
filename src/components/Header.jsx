import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken') || localStorage.getItem('user');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Leave Management
                        </Link>
                    </Typography>

                    <div>
                        {isLoggedIn ? (
                            <Button
                                variant="outlined"
                                color="inherit"
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
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate('/login?role=admin')}
                                    style={{
                                        marginRight: '10px',
                                        fontWeight: 'bold',
                                        padding: '8px 16px',
                                        borderRadius: '25px',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Admin Login
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate('/login?role=employee')}
                                    style={{
                                        fontWeight: 'bold',
                                        padding: '8px 16px',
                                        borderRadius: '25px',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Employee Login
                                </Button>
                            </>
                        )}
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
