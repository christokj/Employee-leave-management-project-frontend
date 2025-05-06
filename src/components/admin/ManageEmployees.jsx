// src/components/admin/ManageEmployees.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const fetchEmployees = async () => {
        const response = await fetch('/api/admin/employees');
        const data = await response.json();
        setEmployees(data);
    };

    const addEmployee = async () => {
        await fetch('/api/admin/employees', {
            method: 'POST',
            body: JSON.stringify({ name, email }),
            headers: { 'Content-Type': 'application/json' },
        });
        fetchEmployees(); // Reload employee list
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <TextField
                label="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Employee Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={addEmployee}>Add Employee</Button>

            <Grid container spacing={2}>
                {employees.map((employee) => (
                    <Grid item xs={4} key={employee.id}>
                        <div>{employee.name}</div>
                        <div>{employee.email}</div>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ManageEmployees;
