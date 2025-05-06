// src/components/employee/ApplyForLeave.js
import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const LeaveApplicationSchema = Yup.object().shape({
    leaveType: Yup.string().required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date().required('Required'),
});

const ApplyForLeave = () => {
    const handleApply = async (values) => {
        const response = await fetch('/api/employee/apply-leave', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
            // Show success message or redirect
        } else {
            // Show error message
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ leaveType: '', startDate: '', endDate: '' }}
                validationSchema={LeaveApplicationSchema}
                onSubmit={handleApply}
            >
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <FormControl fullWidth>
                            <InputLabel>Leave Type</InputLabel>
                            <Field as={Select} name="leaveType" onChange={handleChange} onBlur={handleBlur} value={values.leaveType}>
                                <MenuItem value="sick">Sick Leave</MenuItem>
                                <MenuItem value="vacation">Vacation Leave</MenuItem>
                            </Field>
                        </FormControl>
                        <Field
                            name="startDate"
                            as={TextField}
                            label="Start Date"
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.startDate}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                        />
                        <Field
                            name="endDate"
                            as={TextField}
                            label="End Date"
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.endDate}
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                        />
                        <Button type="submit">Apply</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ApplyForLeave;
