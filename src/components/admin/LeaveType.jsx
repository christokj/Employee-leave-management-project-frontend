import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

export function LeaveType() {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveType, setLeaveType] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [editLeaveType, setEditLeaveType] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [mode, setMode] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchLeaveTypes();
    }, []);

    const fetchLeaveTypes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/leavetypes`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLeaveTypes(response.data);
        } catch (err) {
            console.error('Error fetching leave types:', err);
        }
    };

    const handleAdd = async () => {
        if (!leaveType.trim() || !description.trim()) return;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/leavetypes`, {
                LeaveType: leaveType,
                Description: description
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLeaveTypes([...leaveTypes, response.data]);
            setLeaveType('');
            setDescription('');
            setMode(null);
            alert('Leave type added successfully');
        } catch (err) {
            console.error('Error adding leave type:', err);
        }
    };

    const handleEdit = (id, type, desc) => {
        setEditId(id);
        setEditLeaveType(type);
        setEditDescription(desc);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/leavetypes/${editId}`, {
                LeaveType: editLeaveType,
                Description: editDescription
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            setLeaveTypes(leaveTypes.map(item =>
                item.id === editId
                    ? { ...item, LeaveType: editLeaveType, Description: editDescription }
                    : item
            ));

            setEditId(null);
            setEditLeaveType('');
            setEditDescription('');
            alert('Leave type updated successfully');
        } catch (err) {
            console.error('Error updating leave type:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/leavetypes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLeaveTypes(leaveTypes.filter(item => item.id !== id));
            alert("Leave type deleted successfully");
        } catch (err) {
            console.error('Error deleting leave type:', err);
            alert(err.response?.data?.msg || 'Delete failed');
        }
    };

    return (
        <>
            {!mode ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5" gutterBottom>What would you like to do?</Typography>
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                        <Button variant="contained" onClick={() => setMode('add')}>Add Leave Type</Button>
                        <Button variant="outlined" onClick={() => setMode('manage')}>Manage Leave Types</Button>
                    </Box>
                </Box>
            ) : (
                <>
                    {mode === 'add' && (
                        <Box>
                            <Typography variant="h5" gutterBottom>Add Leave Type</Typography>
                            <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mb={3}>
                                <TextField
                                    label="Leave Type"
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                />
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" onClick={handleAdd}>Submit</Button>
                                    <Button variant="text" onClick={() => setMode(null)}>Back</Button>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {mode === 'manage' && (
                        <Box>
                            <Typography variant="h5" gutterBottom>Manage Leave Types</Typography>
                            <Button variant="text" onClick={() => setMode(null)} sx={{ mb: 2 }}>Back</Button>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SL No</TableCell>
                                            <TableCell>Leave Type</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Created Date</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaveTypes.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>
                                                    {editId === item.id ? (
                                                        <TextField
                                                            value={editLeaveType}
                                                            onChange={(e) => setEditLeaveType(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : item.LeaveType}
                                                </TableCell>
                                                <TableCell>
                                                    {editId === item.id ? (
                                                        <TextField
                                                            value={editDescription}
                                                            onChange={(e) => setEditDescription(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : item.Description}
                                                </TableCell>
                                                <TableCell>{new Date(item.CreationDate).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    {editId === item.id ? (
                                                        <Button onClick={handleUpdate} size="small">Save</Button>
                                                    ) : (
                                                        <IconButton onClick={() => handleEdit(item.id, item.LeaveType, item.Description)}><Edit /></IconButton>
                                                    )}
                                                    <IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </>
            )}
        </>
    );
}
