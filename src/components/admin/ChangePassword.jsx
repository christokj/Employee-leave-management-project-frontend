import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

export function ChangePassword() {
    const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setError('');
        setMessage('');
        if (form.newPass !== form.confirm) {
            setError("New passwords do not match.");
            return;
        }
        // Simulate backend password update
        setTimeout(() => {
            if (form.current === 'admin123') {
                setMessage('Password updated successfully.');
                setForm({ current: '', newPass: '', confirm: '' });
            } else {
                setError('Current password is incorrect.');
            }
        }, 1000);
    };

    return (
        <Box maxWidth={400}>
            <Typography variant="h5" gutterBottom>Change Password</Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            <TextField
                label="Current Password"
                name="current"
                type="password"
                fullWidth
                margin="normal"
                value={form.current}
                onChange={handleChange}
            />
            <TextField
                label="New Password"
                name="newPass"
                type="password"
                fullWidth
                margin="normal"
                value={form.newPass}
                onChange={handleChange}
            />
            <TextField
                label="Confirm Password"
                name="confirm"
                type="password"
                fullWidth
                margin="normal"
                value={form.confirm}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Update Password</Button>
        </Box>
    );
}