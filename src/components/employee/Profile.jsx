// src/components/employee/Profile.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const Profile = () => {
    const [profileData, setProfileData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/employee/profile');
            const data = await response.json();
            setProfileData(data);
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        const response = await fetch('/api/employee/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
            // Show success message or refresh profile
        } else {
            // Show error message
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <TextField
                label="Name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
            <TextField
                label="Email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
        </div>
    );
};

export default Profile;
