import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export function LeaveManagement() {
    const [tab, setTab] = useState(0);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        setApplications([
            { id: 1, employee: 'John Doe', date: '2025-05-01', status: 'pending' },
            { id: 2, employee: 'Jane Smith', date: '2025-04-28', status: 'approved' },
            { id: 3, employee: 'Bob Lee', date: '2025-04-25', status: 'rejected' },
        ]);
    }, []);

    const handleTabChange = (e, newTab) => setTab(newTab);

    const filtered = applications.filter(app => {
        if (tab === 0) return true;
        if (tab === 1) return app.status === 'pending';
        if (tab === 2) return app.status === 'approved';
        if (tab === 3) return app.status === 'rejected';
    });

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Manage Leave Applications</Typography>
            <Tabs value={tab} onChange={handleTabChange} mb={2}>
                <Tab label="All" />
                <Tab label="Pending" />
                <Tab label="Approved" />
                <Tab label="Not Approved" />
            </Tabs>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map(app => (
                            <TableRow key={app.id}>
                                <TableCell>{app.id}</TableCell>
                                <TableCell>{app.employee}</TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>{app.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}