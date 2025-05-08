import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, MenuItem
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [mode, setMode] = useState(null);

    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('Active');
    const [editId, setEditId] = useState(null);
    const [editFullName, setEditFullName] = useState('');
    const [editDepartment, setEditDepartment] = useState('');
    const [editStatus, setEditStatus] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/employees`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setEmployees(res.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };

    const handleAdd = async () => {
        if (!fullName.trim() || !department.trim()) return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/employees`, {
                FullName: fullName,
                Department: department,
                Status: status
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setEmployees([...employees, res.data]);
            setFullName('');
            setDepartment('');
            setStatus('Active');
            setMode(null);
            alert('Employee added successfully');
        } catch (err) {
            console.error('Error adding employee:', err);
        }
    };

    const handleEdit = (emp) => {
        setEditId(emp.EmpId);
        setEditFullName(emp.FirstName);
        setEditDepartment(emp.Department);
        setEditStatus(emp.Status);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/employees/${editId}`, {
                FullName: editFullName,
                Department: editDepartment,
                Status: editStatus
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            setEmployees(employees.map(emp =>
                emp.EmpId === editId
                    ? { ...emp, FullName: editFullName, Department: editDepartment, Status: editStatus }
                    : emp
            ));

            setEditId(null);
            alert('Employee updated successfully');
        } catch (err) {
            console.error('Error updating employee:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setEmployees(employees.filter(emp => emp.EmpId !== id));
            alert('Employee deleted successfully');
        } catch (err) {
            console.error('Error deleting employee:', err);
        }
    };
    console.log(employees)
    return (
        <>
            {!mode ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5">What would you like to do?</Typography>
                    <Box mt={2} display="flex" justifyContent="center" gap={2}>
                        <Button variant="contained" onClick={() => setMode('add')}>Add Employee</Button>
                        <Button variant="outlined" onClick={() => setMode('manage')}>Manage Employees</Button>
                    </Box>
                </Box>
            ) : (
                <>
                    {mode === 'add' && (
                        <Box>
                            <Typography variant="h5">Add Employee</Typography>
                            <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mt={2}>
                                <TextField
                                    label="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <TextField
                                    label="Department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <TextField
                                    select
                                    label="Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </TextField>
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" onClick={handleAdd}>Submit</Button>
                                    <Button variant="text" onClick={() => setMode(null)}>Back</Button>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {mode === 'manage' && (
                        <Box>
                            <Typography variant="h5" gutterBottom>Manage Employees</Typography>
                            <Button variant="text" onClick={() => setMode(null)} sx={{ mb: 2 }}>Back</Button>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SL No</TableCell>
                                            <TableCell>Emp ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Department</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Reg Date</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employees.map((emp, idx) => (
                                            <TableRow key={emp.EmpId}>
                                                <TableCell>{emp.id}</TableCell>
                                                <TableCell>{emp.EmpId}</TableCell>
                                                <TableCell>
                                                    {editId === emp.EmpId ? (
                                                        <TextField
                                                            value={editFullName}
                                                            onChange={(e) => setEditFullName(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : emp.FirstName}
                                                </TableCell>
                                                <TableCell>
                                                    {editId === emp.EmpId ? (
                                                        <TextField
                                                            value={editDepartment}
                                                            onChange={(e) => setEditDepartment(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : emp.Department}
                                                </TableCell>
                                                <TableCell>
                                                    {editId === emp.EmpId ? (
                                                        <TextField
                                                            select
                                                            value={editStatus}
                                                            onChange={(e) => setEditStatus(e.target.value)}
                                                            size="small"
                                                        >
                                                            <MenuItem value="Active">Active</MenuItem>
                                                            <MenuItem value="Inactive">Inactive</MenuItem>
                                                        </TextField>
                                                    ) : emp.Status}
                                                </TableCell>
                                                <TableCell>{new Date(emp.RegDate).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    {editId === emp.EmpId ? (
                                                        <Button onClick={handleUpdate} size="small">Save</Button>
                                                    ) : (
                                                        <IconButton onClick={() => handleEdit(emp)}><Edit /></IconButton>
                                                    )}
                                                    <IconButton onClick={() => handleDelete(emp.EmpId)}><Delete /></IconButton>
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
