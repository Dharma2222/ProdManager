import Product from '../models/Product.js';



// Create
export const createProduct = async (req, res) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
export const getProducts = async (req, res) => {
    const page    = Number(req.query.page)  || 1;
    const limit   = Number(req.query.limit) || 10;
    const sortBy  = req.query.sort          || '-createdAt';
    const keyword = req.query.keyword
      ? {
          $or: [
            { name:        { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};
  
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product
      .find({ ...keyword })
      .sort(sortBy)
      .skip(limit * (page - 1))
      .limit(limit);
  
    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count
    });
  };

// Read One
export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    p ? res.json(p) : res.status(404).json({ error: 'Not found' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

// Update
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: 'Deleted' })
      : res.status(404).json({ error: 'Not found' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
