import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();         

const app = express();
app.use(cors());
app.use(express.json());

// 3.1. Connect to MongoDB
mongoose.connect("mongodb+srv://kevadiyadharma:qnspL72jVPb0ljy9@prodmanager.av37pd6.mongodb.net/?retryWrites=true&w=majority&appName=ProdManager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 3.2. Define Product schema & model
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  image:       { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// 2.1. Define a User schema/model
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true }, // will store hashed password
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// 2.2. Registration route
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    // Basic validation
    if (!fullName?.trim() || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must be 10–15 digits.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Create & save user
    const user = new User({ fullName, email, phone, password: password });
    await user.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// 3.3. CRUD routes

// Create
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    console.log(res)
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read One
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product
      ? res.json(product)
      : res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// Update
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: 'Deleted successfully' })
      : res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// 3.4. Start server
const port = process.env.PORT || 5080;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
