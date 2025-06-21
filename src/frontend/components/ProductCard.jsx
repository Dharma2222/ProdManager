import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductCard = ({ product, handleEdit, handleDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      {/* Product Image Container - Added to control aspect ratio */}
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{ 
          height: '180px', 
          overflow: 'hidden',
          backgroundColor: '#f8f9fa' // Optional: adds a light background
        }}
      >
        <img 
          src={product.image || "https://via.placeholder.com/300x200?text=Product+Image"} 
          alt={product.name}
          style={{ 
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain' // Changed from 'cover' to 'contain'
          }}
          className="p-2" // Added padding to prevent edge touching
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        {/* Product Info */}
        <div className="flex-grow-1">
          <Card.Title as="h3" className="fs-5 mb-2">{product.name}</Card.Title>
          <Card.Text className="text-muted small mb-2">{product.description}</Card.Text>
          <Card.Text className="fw-bold fs-5 text-primary">${product.price}</Card.Text>
        </div>
        
        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <Button onClick={()=>handleEdit(product._id)} variant="outline-primary" size="sm" className="d-flex align-items-center">
            <FaEdit className="me-1" /> Edit
          </Button>
          <Button onClick={()=>handleDelete(product._id)} variant="outline-danger" size="sm" className="d-flex align-items-center">
            <FaTrash className="me-1" /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;