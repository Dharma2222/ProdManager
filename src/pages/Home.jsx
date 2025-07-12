// src/pages/Home.jsx
import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaList, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  { icon: <FaPlus />, title: 'Add Products', desc: 'Quickly add new items to your catalog.' },
  { icon: <FaList />, title: 'View & Track', desc: 'Monitor your product list at a glance.' },
  { icon: <FaEdit />, title: 'Edit Instantly', desc: 'Update details with a single click.' },
  { icon: <FaTrash />, title: 'Delete Securely', desc: 'Remove items safely and confidently.' },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="d-flex align-items-center" 
        style={{
          height: '80vh',
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://source.unsplash.com/1600x900/?technology,product)',
          backgroundSize: 'cover',
          color: '#fff'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container className="text-center">
          <motion.h1
            className="display-3 fw-bold mb-3"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ color: '#ffc107' }}>Prod</span>Manage
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your all-in-one solution to create, view, edit, and delete products<br />
            faster and smarter than ever.
          </motion.p>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="warning" size="lg" className="me-3" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
            <Button variant="outline-light" size="lg" onClick={() => navigate('/login')}>
              Log In
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row className="g-4">
          {features.map((feat, idx) => (
            <Col key={idx} md={6} lg={3}>
              <Card className="h-100 text-center border-0 shadow-sm p-3">
                <div className="mb-3 display-6 text-primary">{feat.icon}</div>
                <h5>{feat.title}</h5>
                <p className="text-muted">{feat.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;