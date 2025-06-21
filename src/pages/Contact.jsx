import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="mb-4">Contact Us</h2>
          
          <div className="mb-3">
            <h5 className="text-muted">Email</h5>
            <p>hello@prodmanage.com</p>
          </div>
          
          <div className="mb-3">
            <h5 className="text-muted">Phone</h5>
            <p>+1 (555) 123-4567</p>
          </div>
          
          <div className="mb-3">
            <h5 className="text-muted">Address</h5>
            <p>123 React Street, UI City, CA 90210</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;