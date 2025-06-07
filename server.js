import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

let products = []; // Dummy in-memory data

// Create
app.post('/api/products', (req, res) => {
  const product = { id: Date.now().toString(), ...req.body };
  products.push(product);
  res.status(201).json(product);
});

// Read All
app.get('/api/products', (req, res) => res.json(products));

// Read One
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  product ? res.json(product) : res.status(404).send('Not found');
});

// Update
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// Delete
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(200).send('Deleted');
});

// Start
app.listen(5080, () => console.log('Server running on port 5000'));
