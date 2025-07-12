// src/components/RegistrationForm.jsx
import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { axiosInst } from '../redux/actions/productAction';

const RegistrationForm = () => (
  <motion.section
    className="d-flex align-items-center justify-content-center vh-100"
    style={{
      background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://source.unsplash.com/1600x900/?signup,form') center/cover no-repeat`
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <Container className="d-flex justify-content-center">
      <Card
        className="shadow-lg"
        style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}
      >
        <Card.Body className="p-4">
          <motion.h3
            className="text-center mb-3"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Join <strong>ProdManage</strong>
          </motion.h3>
          <p className="text-center text-muted mb-4">
            Create your account to start managing products effortlessly.
          </p>

          <Formik
            initialValues={{ fullName: '', email: '', phone: '', password: '', confirmPassword: '' }}
            validate={values => {
              const errors = {};
              if (!values.fullName.trim()) errors.fullName = 'Required';
              if (!values.email) errors.email = 'Required';
              else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                errors.email = 'Invalid email address';
              if (!values.phone) errors.phone = 'Required';
              else if (!/^\d{10,15}$/.test(values.phone)) errors.phone = 'Invalid phone number';
              if (!values.password) errors.password = 'Required';
              else if (values.password.length < 6) errors.password = 'Must be 6+ characters';
              if (!values.confirmPassword) errors.confirmPassword = 'Required';
              else if (values.confirmPassword !== values.password)
                errors.confirmPassword = 'Passwords do not match';
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              axiosInst.post('/api/auth/register', values)
                .then(() => alert('Registration Successful'))
                .catch(err => alert(err.response?.data?.error || 'Registration failed'))
                .finally(() => {
                  setSubmitting(false);
                  resetForm();
                });
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <FormikForm>
                {/* Full Name */}
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaUser />
                    </span>
                    <Field
                      as={Form.Control}
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className={
                        touched.fullName && errors.fullName ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="invalid-feedback ps-3"
                    />
                  </div>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaEnvelope />
                    </span>
                    <Field
                      as={Form.Control}
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className={
                        touched.email && errors.email ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback ps-3"
                    />
                  </div>
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaPhoneAlt />
                    </span>
                    <Field
                      as={Form.Control}
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      className={
                        touched.phone && errors.phone ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback ps-3"
                    />
                  </div>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock />
                    </span>
                    <Field
                      as={Form.Control}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={
                        touched.password && errors.password ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback ps-3"
                    />
                  </div>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaLock />
                    </span>
                    <Field
                      as={Form.Control}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className={
                        touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback ps-3"
                    />
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                  </Button>
                </motion.div>
              </FormikForm>
            )}
          </Formik>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{' '}
              <Button variant="link" onClick={() => navigate('/login')} className="p-0">
                Log In
              </Button>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  </motion.section>
);

export default RegistrationForm;
