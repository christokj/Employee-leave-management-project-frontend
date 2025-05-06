// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';

const AdminDashboard = () => {
    const [leaveStats, setLeaveStats] = useState({});

    useEffect(() => {
        const fetchLeaveStats = async () => {
            const response = await fetch('/api/admin/leave-stats');
            const data = await response.json();
            setLeaveStats(data);
        };
        fetchLeaveStats();
    }, []);

    return (
        <div>
            <Typography variant="h4">Admin Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Pending Applications</Typography>
                        <Typography>{leaveStats.pending}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Approved Applications</Typography>
                        <Typography>{leaveStats.approved}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Not Approved Applications</Typography>
                        <Typography>{leaveStats.notApproved}</Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashboard;
