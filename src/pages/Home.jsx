import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section style={{height:"90vh"}} className="mb-5 py-5 d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          {/* Left side - Text content */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <h1 className="display-4 mb-3">Welcome to ProdManage</h1>
            <p className="lead mb-4">
              Effortlessly manage your products with our all-in-one tool. Create, view,
              edit, and delete products - fast, simple, and reliable.
            </p>
            <Button variant="primary" size="lg" onClick={()=>navigate('/products')}>
              Explore Products
            </Button>
          </Col>
          
          {/* Right side - Image */}
          <Col lg={5} className="d-flex align-items-center">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/011/883/309/non_2x/fashion-clothing-store-for-women-template-hand-drawn-cartoon-flat-illustration-with-shopping-buying-products-cloth-or-dresses-design-vector.jpg" 
              alt="Product Management" 
              className="img-fluid rounded shadow w-100"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;