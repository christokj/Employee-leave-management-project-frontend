import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

export function Dashboard() {
    const [summary, setSummary] = useState({});
    const [recentLeaves, setRecentLeaves] = useState([]);


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const data = response.data;

                setSummary({
                    totalEmployees: data.totalEmployees,
                    totalDepartments: data.totalDepartments,
                    totalLeaveTypes: data.totalLeaveTypes,
                    pendingLeaves: data.pendingLeaves,
                });

                const recent = data.recentLeaves.map((leave) => ({
                    id: leave.id,
                    employee: `${leave.first_name} ${leave.last_name}`,
                    type: leave.leave_type,
                    status: leave.status,
                }));
                setRecentLeaves(recent);

            } catch (error) {
                console.error('Error fetching dashboard:', error);
            }
        };

        fetchDashboard();
    }, []);


    return (
        <Box>
            <Typography variant="h5" gutterBottom>Dashboard Summary</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card><CardContent><Typography>Total Employees: {summary.totalEmployees}</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={4}>
                    <Card><CardContent><Typography>Total Departments: {summary.totalDepartments}</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={4}>
                    <Card><CardContent><Typography>Total Leave Types: {summary.totalLeaveTypes}</Typography></CardContent></Card>
                </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 4 }}>Latest Leave Applications</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentLeaves.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell>{leave.employee}</TableCell>
                                <TableCell>{leave.type}</TableCell>
                                <TableCell>{leave.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}