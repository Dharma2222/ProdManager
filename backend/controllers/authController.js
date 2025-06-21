// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../constants.js';

export const registerUser = async (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;
  if (![fullName, email, phone, password, confirmPassword].every(Boolean))
    return res.status(400).json({ error: 'All fields are required.' });
  if (password !== confirmPassword)
    return res.status(400).json({ error: 'Passwords must match.' });

  if (await User.findOne({ email }))
    return res.status(409).json({ error: 'Email already registered.' });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, phone, password: hash });
  await user.save();

  // sign a JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({ token });
};

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

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
};
