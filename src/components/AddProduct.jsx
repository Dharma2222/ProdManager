import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddProduct = ({ onAddProduct,currProduct }) => {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  useEffect(()=>{
    if(currProduct)
      setProduct(currProduct)
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...product,
      price: parseFloat(product.price)
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
         {currProduct != null ?"Update":"Add"}  Product
      </Button>
    </Form>
  );
};

export default AddProduct;