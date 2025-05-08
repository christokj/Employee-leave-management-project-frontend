import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    CssBaseline,
    ListItemButton
} from '@mui/material';

const drawerWidth = 240;

const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Department', path: '/admin/department' },
    { label: 'Leave Type', path: '/admin/leave-type' },
    { label: 'Employees', path: '/admin/employees' },
    { label: 'Leave Management', path: '/admin/leave-management' },
    { label: 'Change Password', path: '/admin/change-password' },
    { label: 'Logout', path: '/login' },
];

export default function AdminPage() {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}   