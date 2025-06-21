// src/components/RegistrationForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { axiosInst } from '../redux/actions/productAction';

const RegistrationForm = () => (
    <Formik
        initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }}
        validate={values => {
            const errors = {};
            if (!values.fullName.trim()) {
                errors.fullName = 'Full Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.phone) {
                errors.phone = 'Phone is required';
            } else if (!/^\d{10,15}$/.test(values.phone)) {
                errors.phone = 'Phone must be 10–15 digits';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords must match';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            axiosInst.post("/api/register", values).then(res => {
                alert("Registration Successful")
            }).catch(err => {
                console.log(err);
            })
            setSubmitting(false);
            resetForm();
        }}
    >
        {({ isSubmitting, touched, errors }) => (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="w-100" style={{ maxWidth: '600px' }}>
                    <Form noValidate className="p-4 border rounded bg-white">
                        {/* Full Name */}
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <Field
                                type="text"
                                name="fullName"
                                id="fullName"
                                className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''
                                    }`}
                            />
                            <ErrorMessage
                                name="fullName"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''
                                    }`}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        {/* Phone */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <Field
                                type="text"
                                name="phone"
                                id="phone"
                                className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''
                                    }`}
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''
                                    }`}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`form-control ${touched.confirmPassword && errors.confirmPassword
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting…' : 'Register'}
                        </button>
                    </Form>
                </div>
            </div>
        )}
    </Formik>
);

export default RegistrationForm;
