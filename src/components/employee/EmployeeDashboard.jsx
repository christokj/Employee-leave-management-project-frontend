// src/components/employee/EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';

const EmployeeDashboard = () => {
    const [leaveStats, setLeaveStats] = useState({});

    useEffect(() => {
        const fetchLeaveStats = async () => {
            const response = await fetch('/api/employee/leave-stats');
            const data = await response.json();
            setLeaveStats(data);
        };
        fetchLeaveStats();
    }, []);

    return (
        <div>
            <Typography variant="h4">Employee Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Total Leave Balance</Typography>
                        <Typography>{leaveStats.totalLeave}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Used Leave</Typography>
                        <Typography>{leaveStats.usedLeave}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Typography variant="h6">Remaining Leave</Typography>
                        <Typography>{leaveStats.remainingLeave}</Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default EmployeeDashboard;
