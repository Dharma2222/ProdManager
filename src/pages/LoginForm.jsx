// src/components/LoginForm.jsx
import React, { useContext, useEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { axiosInst } from '../redux/actions/productAction';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect on token change (successful login)
  useEffect(() => {
    if (token) {
      navigate('/products', { replace: true });
    }
  }, [token, navigate]);

  return (
    <motion.section
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://source.unsplash.com/1600x900/?workspace,product') center/cover no-repeat`
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
              Welcome Back to <strong>ProdManage</strong>
            </motion.h3>
            <p className="text-center text-muted mb-4">
              Enter your email and password to continue.
            </p>

            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = 'Required';
                } else if (values.password.length < 6) {
                  errors.password = 'Must be 6 characters or more';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await axiosInst.post('/api/auth/login', values);
                  login(res.data.token, null);
                } catch (err) {
                  alert(err.response?.data?.error || 'Login failed');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, touched, errors }) => (
                <FormikForm>
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

                  <Form.Group className="mb-4">
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

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>
                  </motion.div>
                </FormikForm>
              )}
            </Formik>

            <div className="text-center">
              <small className="text-muted">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/register')}
                  className="p-0"
                >
                  Sign Up
                </Button>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </motion.section>
  );
};

export default LoginForm;
