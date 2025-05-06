import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get('role'); // 'admin' or 'employee'

    const handleLogin = async (values) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ ...values, role }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('user', JSON.stringify({ username: values.username, role: data.role }));
            navigate(data.role === 'admin' ? '/admin' : '/employee');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '40px' }}>
            <Typography variant="h5" gutterBottom>
                {role === 'admin' ? 'Admin Login' : 'Employee Login'}
            </Typography>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name="username"
                            as={TextField}
                            label="Username"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <Field
                            name="password"
                            as={TextField}
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<LockIcon />}
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default LoginPage;
