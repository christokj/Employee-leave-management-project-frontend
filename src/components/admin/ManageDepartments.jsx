// src/components/admin/ManageDepartments.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    const fetchDepartments = async () => {
        const response = await fetch('/api/admin/departments');
        const data = await response.json();
        setDepartments(data);
    };

    const addDepartment = async () => {
        await fetch('/api/admin/departments', {
            method: 'POST',
            body: JSON.stringify({ name: departmentName }),
            headers: { 'Content-Type': 'application/json' },
        });
        fetchDepartments(); // Reload the department list
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div>
            <TextField
                label="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />
            <Button onClick={addDepartment}>Add Department</Button>

            <Grid container spacing={2}>
                {departments.map((dept) => (
                    <Grid item xs={4} key={dept.id}>
                        <div>{dept.name}</div>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ManageDepartments;
