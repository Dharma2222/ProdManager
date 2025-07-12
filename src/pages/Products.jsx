import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Container, Row, Col, Button, Modal, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/actions/productAction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCard = lazy(() => import('../components/ProductCard'));
const AddProduct  = lazy(() => import('../components/AddProduct'));

const Products = () => {
  const { products = [], loading, pages = 1, total = 0 } = useSelector(state => state.items);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [currProduct, setCurrProduct] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6; // products per page

  const dispatch = useDispatch();

  // Fetch whenever page changes
  useEffect(() => {
    dispatch(fetchProducts(page, limit));
  }, [dispatch, page]);

  const handleClose = () => setShowModal(false);
  const handleAddProduct = newProduct => {
    if (isEdit != null) dispatch(updateProduct(isEdit, newProduct));
    else dispatch(createProduct(newProduct));
    handleClose();
  };
  const handleDelete = id => dispatch(deleteProduct(id));
  const handleEdit   = id => {
    setIsEdit(id);
    setCurrProduct(products.find(p => p._id === id) || null);
    setShowModal(true);
  };

  if (loading) {
    return (
      <section className="mb-5"><Container><Row className="g-4">{
        Array.from({ length: limit }).map((_,i)=> (
          <Col key={i} md={4}><Skeleton height={250}/></Col>
        ))}
      </Row></Container></section>
    );
  }

  return (
    <section className="mb-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">ProdManage ({total})</h2>
          <Button onClick={()=>{setIsEdit(null);setCurrProduct(null);setShowModal(true);}}>Add Product</Button>
        </div>

        <Suspense fallback={<Skeleton count={3} height={300}/>}>  
          <Row className="g-4">
            {products.length===0 ? <p className="text-center">No products.</p> : products.map(p=> (
              <Col key={p._id} md={4}><ProductCard product={p} handleDelete={handleDelete} handleEdit={handleEdit}/></Col>
            ))}
          </Row>

          {/* Pagination */}
          {pages>1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev disabled={page===1} onClick={()=>setPage(p=>p-1)}/>
              {Array.from({length: pages}).map((_,i)=>(
                <Pagination.Item key={i+1} active={page===i+1} onClick={()=>setPage(i+1)}>{i+1}</Pagination.Item>
              ))}
              <Pagination.Next disabled={page===pages} onClick={()=>setPage(p=>p+1)}/>
            </Pagination>
          )}

          {/* Modal */}
          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton><Modal.Title>{isEdit!=null?'Edit':'Add'} Product</Modal.Title></Modal.Header>
            <Modal.Body><AddProduct onAddProduct={handleAddProduct} currProduct={currProduct}/></Modal.Body>
          </Modal>
        </Suspense>
      </Container>
    </section>
  );
};

export default Products;