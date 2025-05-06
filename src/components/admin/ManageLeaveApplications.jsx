// src/components/admin/ManageLeaveApplications.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ManageLeaveApplications = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);

    useEffect(() => {
        const fetchLeaveApplications = async () => {
            const response = await fetch('/api/admin/leave-applications'); // Replace with your API endpoint
            const data = await response.json();
            setLeaveApplications(data);
        };
        fetchLeaveApplications();
    }, []);

    const handleApprove = async (id) => {
        const response = await fetch(`/api/admin/approve-leave/${id}`, {
            method: 'POST',
        });
        const data = await response.json();
        if (data.success) {
            // Refresh the leave applications after approval
            setLeaveApplications(leaveApplications.map(app =>
                app.id === id ? { ...app, status: 'Approved' } : app
            ));
        }
    };

    const handleReject = async (id) => {
        const response = await fetch(`/api/admin/reject-leave/${id}`, {
            method: 'POST',
        });
        const data = await response.json();
        if (data.success) {
            // Refresh the leave applications after rejection
            setLeaveApplications(leaveApplications.map(app =>
                app.id === id ? { ...app, status: 'Not Approved' } : app
            ));
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Manage Leave Applications</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button variant="contained" component={Link} to="/admin/leave-applications/pending">
                        View Pending Applications
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveApplications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell>{application.employeeName}</TableCell>
                                <TableCell>{application.leaveType}</TableCell>
                                <TableCell>{application.startDate}</TableCell>
                                <TableCell>{application.endDate}</TableCell>
                                <TableCell>{application.status}</TableCell>
                                <TableCell>
                                    {application.status === 'Pending' ? (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => handleApprove(application.id)}>Approve</Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleReject(application.id)} style={{ marginLeft: '10px' }}>Reject</Button>
                                        </>
                                    ) : (
                                        <Typography>{application.status}</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageLeaveApplications;
