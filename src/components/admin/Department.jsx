import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

export function Department() {
    const [departments, setDepartments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editCode, setEditCode] = useState('');
    const [editName, setEditName] = useState('');
    const [editShortName, setEditShortName] = useState('');
    const [mode, setMode] = useState(null);
    const [deptName, setDeptName] = useState('');
    const [deptShortName, setDeptShortName] = useState('');
    const [deptCode, setDeptCode] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const token = localStorage.getItem('token');

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/departments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setDepartments(response.data);
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };


    const handleAdd = async () => {
        if (!deptName.trim() || !deptShortName.trim() || !deptCode.trim()) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/departments`, {
                name: deptName,
                short_name: deptShortName,
                code: deptCode,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setDepartments([...departments, response.data]);
            setDeptName('');
            setDeptShortName('');
            setDeptCode('');
            setMode(null); // Go back to mode selection or keep in add
            alert('Department added successfully')
        } catch (err) {
            console.error('Error adding department:', err);
        }
    };



    const handleEdit = (id, code, name, shortName) => {
        setEditId(id);
        setEditCode(code);
        setEditName(name);
        setEditShortName(shortName);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/departments/${editId}`, {
                code: editCode,
                name: editName,
                short_name: editShortName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setDepartments(departments.map(d =>
                d.id === editId
                    ? { ...d, DepartmentCode: editCode, DepartmentName: editName, DepartmentShortName: editShortName }
                    : d
            ));

            setEditId(null);
            setEditCode('');
            setEditName('');
            setEditShortName('');
        } catch (err) {
            console.error('Error updating department:', err);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/departments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setDepartments(departments.filter(d => d.id !== id));
            alert("Department deleted successfully")
        } catch (err) {
            console.error('Error deleting department:', err);
            alert(err.response?.data?.msg || 'Delete failed');
        }
    };


    return (
        <>
            {!mode ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5" gutterBottom>What would you like to do?</Typography>
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                        <Button variant="contained" onClick={() => setMode('add')}>Add Department</Button>
                        <Button variant="outlined" onClick={() => setMode('manage')}>Manage Departments</Button>
                    </Box>
                </Box>
            ) : (
                <>
                    {mode === 'add' && (
                        <Box>
                            <Typography variant="h5" gutterBottom>Add New Department</Typography>
                            <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mb={3}>
                                <TextField
                                    label="Department Name"
                                    value={deptName}
                                    onChange={(e) => setDeptName(e.target.value)}
                                />
                                <TextField
                                    label="Short Name"
                                    value={deptShortName}
                                    onChange={(e) => setDeptShortName(e.target.value)}
                                />
                                <TextField
                                    label="Department Code"
                                    value={deptCode}
                                    onChange={(e) => setDeptCode(e.target.value)}
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
                            <Typography variant="h5" gutterBottom>Manage Departments</Typography>
                            <Button variant="text" onClick={() => setMode(null)} sx={{ mb: 2 }}>Back</Button>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Code</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Short Name</TableCell>
                                            <TableCell>Creation Date</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {departments.map((dept) => (
                                            <TableRow key={dept.id}>
                                                <TableCell>{dept.id}</TableCell>
                                                <TableCell>
                                                    {editId === dept.id ? (
                                                        <TextField
                                                            value={editCode}
                                                            onChange={(e) => setEditCode(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : (
                                                        dept.DepartmentCode
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editId === dept.id ? (
                                                        <TextField
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : (
                                                        dept.DepartmentName
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editId === dept.id ? (
                                                        <TextField
                                                            value={editShortName}
                                                            onChange={(e) => setEditShortName(e.target.value)}
                                                            size="small"
                                                        />
                                                    ) : (
                                                        dept.DepartmentShortName
                                                    )}
                                                </TableCell>
                                                <TableCell>{new Date(dept.CreationDate).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    {editId === dept.id ? (
                                                        <Button onClick={handleUpdate} size="small">Save</Button>
                                                    ) : (
                                                        <IconButton onClick={() => handleEdit(
                                                            dept.id,
                                                            dept.DepartmentCode,
                                                            dept.DepartmentName,
                                                            dept.DepartmentShortName
                                                        )}><Edit /></IconButton>
                                                    )}
                                                    <IconButton onClick={() => handleDelete(dept.id)}><Delete /></IconButton>
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