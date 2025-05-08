import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';

const LoginSchema = Yup.object().shape({
    UserName: Yup.string().required('Username is required'),
    Password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get('role'); // 'admin' or 'employee'

    const handleLogin = async (values) => {
        try {
            const endpoint =
                role === 'admin'
                    ? `${import.meta.env.VITE_API_URL}/api/admin/auth/login`
                    : `${import.meta.env.VITE_API_URL}/api/auth/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, role }), // still pass role to backend
            });

            const data = await response.json();
            // console.log(response.ok, data.token, data.role)
            if (response.ok && data.token && data.role) {
                const userData = {
                    UserName: values.UserName,
                    role: data.role,
                    token: data.token,
                };
                localStorage.setItem('user', JSON.stringify(userData));

                // Redirect based on backend role
                navigate(data.role === 'admin' ? '/admin' : '/employee', { replace: true });
            } else {
                alert(data.msg || 'Invalid credentials');
            }
        } catch (err) {
            alert('Login failed');
            console.error(err);
        }
    };


    return (
        <Container maxWidth="xs" style={{ marginTop: '40px' }}>
            <Typography variant="h5" gutterBottom>
                {role === 'admin' ? 'Admin Login' : 'Employee Login'}
            </Typography>
            <Formik
                initialValues={{ UserName: '', Password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name="UserName"
                            as={TextField}
                            label="UserName"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.UserName}
                            error={!!errors.UserName}
                            helperText={errors.UserName}
                        />
                        <Field
                            name="Password"
                            as={TextField}
                            label="Password"
                            type="Password"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Password}
                            error={!!errors.Password}
                            helperText={errors.Password}
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
