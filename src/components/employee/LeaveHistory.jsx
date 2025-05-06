// src/components/employee/LeaveHistory.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LeaveHistory = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            const response = await fetch('/api/employee/leave-history');
            const data = await response.json();
            setLeaveHistory(data);
        };
        fetchLeaveHistory();
    }, []);

    return (
        <div>
            <h2>Leave History</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveHistory.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell>{leave.leaveType}</TableCell>
                                <TableCell>{leave.startDate}</TableCell>
                                <TableCell>{leave.endDate}</TableCell>
                                <TableCell>{leave.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LeaveHistory;
