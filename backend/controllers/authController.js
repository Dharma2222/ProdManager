// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../constants.js';

// Register new user (default role = 'user')
export const registerUser = async (req, res) => {
  const { fullName, email, phone, password, confirmPassword, role } = req.body;
  // 1) Validate input
  if (![fullName, email, phone, password, confirmPassword].every(Boolean))
    return res.status(400).json({ error: 'All fields are required.' });
  if (password !== confirmPassword)
    return res.status(400).json({ error: 'Passwords must match.' });

  // 2) Check for existing email
  if (await User.findOne({ email }))
    return res.status(409).json({ error: 'Email already registered.' });

  // 3) Hash password & create user with default role='user'
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ fullName, email, phone, password: hash, role: user });
  await newUser.save();

  // 4) Sign a JWT that includes the user's role
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 5) Return token and role
  res.status(201).json({ token, role: newUser.role });
};

// Login existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ error: 'Invalid credentials.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ error: 'Invalid credentials.' });

  // Sign JWT including role
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Return token and role
  res.status(200).json({ token, role: user.role });
};

// Get currently authenticated user's profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};
